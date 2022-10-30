import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

import Modal from 'src/components/utils/Modal/index';

describe('Modal Snapshots', () => {
  let portalContainer: Element | null = null;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((children: ReactNode, container: Element) => {
      portalContainer = container;
      return children;
    }) as typeof ReactDOM.createPortal;
  });

  test('renders Modal with default options', async () => {
    const tree = renderer.create(
      <Modal open>
        <span>Modal</span>
      </Modal>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(portalContainer).toBe(document.body);
  });
});
