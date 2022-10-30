import renderer, { ReactTestInstance } from 'react-test-renderer';

import SvgIcon from 'src/components/displays/icons/SvgIcon/index';

describe('SvgIcon Snapshots', () => {
  test('renders SvgIcon with default options', async () => {
    const tree = renderer.create(
      <SvgIcon>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('path');
  });

  test('renders SvgIcon with class', async () => {
    const tree = renderer.create(
      <SvgIcon className="test">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('test');
  });
});
