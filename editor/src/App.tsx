import { Suspense } from 'react';
import VerticalNavbar from '@jtoolkit/navbar/dist/components/VerticalNavbar';
import EditorLayout from '@jtoolkit/layout/dist/components/EditorLayout';

import './styles/global.css';

const App = () => (
  <div style={{ margin: '20px' }}>
    <Suspense fallback="Loading header...">
      <EditorLayout>
        <VerticalNavbar />
      </EditorLayout>
    </Suspense>
  </div>
);
export default App;
