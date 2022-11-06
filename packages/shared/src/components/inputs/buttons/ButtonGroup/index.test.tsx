import renderer, { ReactTestInstance } from 'react-test-renderer';

import Button from 'src/components/inputs/buttons/Button';
import ButtonGroup from 'src/components/inputs/buttons/ButtonGroup/index';
import { ButtonGroupDirection } from 'src/enums';

describe('ButtonGroup Snapshots', () => {
  test('renders ButtonGroup with default options', async () => {
    const tree = renderer.create(
      <ButtonGroup>
        <Button>Test1</Button>
        <Button>Test2</Button>
      </ButtonGroup>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0] as ReactTestInstance)
        .type,
    ).toBe('button');
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[1] as ReactTestInstance).children[0] as ReactTestInstance)
        .type,
    ).toBe('button');
    expect(tree.toTree()?.props.className).toContain('row');
  });

  test('renders ButtonGroup with column', async () => {
    const tree = renderer.create(
      <ButtonGroup direction={ButtonGroupDirection.COLUMN}>
        <Button>Test1</Button>
        <Button>Test2</Button>
      </ButtonGroup>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('column');
  });
});
