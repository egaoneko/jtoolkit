import { FC } from 'react';

import 'src/styles';

export interface EditorLayoutProps {
  children?: React.ReactNode;
}

const EditorLayout: FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className={'w-full'}>
      <span>EditorLayout</span>
      {children}
    </div>
  );
};

export default EditorLayout;
