import renderer, { ReactTestInstance } from 'react-test-renderer';

import SvgIcon from 'src/components/displays/icons/SvgIcon';
import IconButton from 'src/components/inputs/buttons/IconButton/index';

describe('IconButton Snapshots', () => {
  const icon = (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );

  test('renders IconButton with default options', async () => {
    const tree = renderer.create(<IconButton>{icon}</IconButton>);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('button');
    expect(
      (
        (
          ((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance)
            .children[0] as ReactTestInstance
        ).children[0] as ReactTestInstance
      ).type,
    ).toContain('svg');
  });

  test('renders IconButton with class', async () => {
    const tree = renderer.create(<IconButton className="test">{icon}</IconButton>);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('test');
  });
});
