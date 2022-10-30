import renderer from 'react-test-renderer';

import Backdrop from 'src/components/utils/Backdrop/index';

describe('Backdrop Snapshots', () => {
  test('renders Backdrop with default options', async () => {
    const tree = renderer.create(<Backdrop />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('renders Backdrop with class', async () => {
    const tree = renderer.create(<Backdrop className="test" />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('test');
  });
});
