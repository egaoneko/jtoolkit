import renderer, { ReactTestInstance } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

import Portal from 'src/components/utils/Portal/index';

describe('Portal', () => {
  let portalContainer: Element | null = null;
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((children: ReactNode, container: Element) => {
      portalContainer = container;
      return children;
    }) as typeof ReactDOM.createPortal;
  });

  afterEach(() => {
    portalContainer = null;
    (ReactDOM.createPortal as jest.Mock).mockClear();
  });

  test('renders Portal with default options', async () => {
    const tree = renderer.create(
      <Portal>
        <div>Test</div>
      </Portal>,
    );
    await renderer.act(async () => {
      expect(tree.toJSON()).toMatchSnapshot();
      expect(portalContainer).toBe(document.body);
      expect((tree.root.children[0] as ReactTestInstance).children[0]).toBe('Test');
    });
  });

  test('renders Portal with container', async () => {
    const container = document.createElement('div');
    const tree = renderer.create(
      <Portal container={container}>
        <div>Test</div>
      </Portal>,
    );
    await renderer.act(async () => {
      expect(tree.toJSON()).toMatchSnapshot();
      expect(tree.root.props.container).toBe(container);
      expect(portalContainer).toBe(container);
    });
  });

  test('renders Portal with disablePortal', async () => {
    const tree = renderer.create(
      <Portal disablePortal>
        <div>Test</div>
      </Portal>,
    );
    await renderer.act(async () => {
      expect(tree.toJSON()).toMatchSnapshot();
      expect(tree.root.props.disablePortal).toBeTruthy();
      expect(portalContainer).toBeNull();
    });
  });
});
