/// <reference types="@jtoolkit/layout/types" />
/// <reference types="@jtoolkit/navbar/types" />

declare module '*.mdx';
declare module '*.css';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
