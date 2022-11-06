module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js', '**.stories.tsx'],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'index', 'sibling', 'object', 'type'],
        'newlines-between': 'always',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Usage of relative parent imports is not allowed.',
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/internal-module-folders': ['@jtoolkit/'],
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './', 'src/'],
      },
    },
  },
};
