/// <reference types="@jtoolkit/util/types" />

declare module '*.mdx';
declare module '*.css';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
