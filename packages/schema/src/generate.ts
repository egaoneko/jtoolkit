import path from 'path';
import { existsSync } from 'fs';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import { compile } from 'json-schema-to-typescript';
import { outputFile, readdir, appendFile, unlink } from 'fs-extra';

import type { JSONSchema4 } from 'json-schema';

interface Schema {
  dereferenced: JSONSchema4;
  filePath: string;
  absoluteDirPath: string;
  relativeDirPath: string;
  dirNames: string[];
  dirName: string;
  fileName?: string;
}

interface Import {
  title: string;
  path: string;
}

export interface GenerateOption {
  generateIndex?: boolean;
}

export async function generate(schemaPath: string, targetPath: string, options?: GenerateOption): Promise<void> {
  options = {
    generateIndex: false,
    ...options,
  };

  const schemas: Schema[] = [];
  const schemaMap: Map<string, Schema> = new Map();

  for await (const filePath of getFiles(schemaPath)) {
    if (!/.json/.test(filePath)) {
      continue;
    }

    const absoluteDirPath = path.dirname(filePath);
    const relativeDirPath = absoluteDirPath.replace(schemaPath, '');
    const dirNames = relativeDirPath.replace(schemaPath, '').split(path.sep);
    const dirName = dirNames[dirNames.length - 1];
    const fileName = path.basename(filePath).split('.').shift();
    const dereferenced = (await $RefParser.dereference(filePath)) as JSONSchema4;

    const schema: Schema = {
      dereferenced,
      filePath,
      absoluteDirPath,
      relativeDirPath,
      dirNames,
      dirName,
      fileName,
    };

    if (!dereferenced.title) {
      continue;
    }

    schemas.push(schema);
    schemaMap.set(dereferenced.title, schema);
  }

  for (const schema of schemas) {
    try {
      let ts = await compile(schema.dereferenced, schema.fileName as string, {
        cwd: schemaPath,
        declareExternallyReferenced: false,
        style: {
          singleQuote: true,
        },
      });

      let imports: Import[] = [];

      if (schema.dereferenced.extends) {
        imports = imports.concat(getImports(schema.dereferenced.extends, schema, schemaMap));
      }

      if (schema.dereferenced.properties) {
        imports = imports.concat(getImports(Object.values(schema.dereferenced.properties), schema, schemaMap));
      }

      imports = imports.filter((v, i, a) => a.findIndex(v2 => v.title === v2.title) === i);

      for (const item of imports) {
        ts = `import { ${item.title} } from '${item.path}';\n` + ts;
      }

      await outputFile(`${targetPath}/${schema.relativeDirPath || ''}/${schema.fileName}.ts`, ts);
    } catch (e) {
      console.error(e);
    }
  }

  if (options.generateIndex) {
    await generateIndex(targetPath);
  }
}

async function generateIndex(dir: string) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const indexPath = path.resolve(dir, 'index.ts');

  if (existsSync(indexPath)) {
    await unlink(indexPath);
  }

  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      await generateIndex(res);
      await appendFile(indexPath, `export * as ${dirent.name} from './${dirent.name}';\n`);
    } else {
      if (!/.ts/.test(dirent.name)) {
        continue;
      }
      const fileName = path.basename(res).split('.').shift();
      await appendFile(indexPath, `export * from './${fileName}';\n`);
    }
  }
}

async function* getFiles(dir: string): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function getImports(dereferenced: any, schema: Schema, schemaMap: Map<string, Schema>): Import[] {
  const imports: Import[] = [];

  if (Array.isArray(dereferenced)) {
    dereferenced.forEach(item => {
      if (item.type === 'object' && typeof item.title !== 'undefined') {
        imports.push({
          title: item.title,
          path: getRelative(schema.absoluteDirPath, (schemaMap.get(item.title) as Schema).absoluteDirPath, item.title),
        });
      } else if (item.type === 'array' && typeof item.items.title !== 'undefined') {
        imports.push({
          title: item.items.title,
          path: getRelative(
            schema.absoluteDirPath,
            (schemaMap.get(item.items.title) as Schema).absoluteDirPath,
            item.items.title,
          ),
        });
      }
    });
  } else if (typeof dereferenced === 'object') {
    if (dereferenced.title) {
      imports.push({
        title: dereferenced.title,
        path: getRelative(
          schema.absoluteDirPath,
          (schemaMap.get(dereferenced.title) as Schema).absoluteDirPath,
          dereferenced.title,
        ),
      });
    }
  }
  return imports;
}

function getRelative(origin: string, target: string, title: string): string {
  return (path.relative(origin, target) || '.') + '/' + title;
}
