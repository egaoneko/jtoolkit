import renderer, { ReactTestInstance } from 'react-test-renderer';

import Button from 'src/components/inputs/buttons/Button/index';
import { ButtonGroupDirection, ButtonVariant, Color, Size } from 'src/enums';
import SvgIcon from 'src/components/displays/icons/SvgIcon';

describe('Button Snapshots', () => {
  const icon = (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );

  test('renders Button with default options', async () => {
    const tree = renderer.create(
      <Button>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('div');
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0]).toBe('Test');
    expect(tree.toTree()?.props.className).toContain('contained');
    expect(tree.toTree()?.props.className).toContain('medium');
    expect(tree.toTree()?.props.className).toContain('primary');
  });

  test('renders Button with class', async () => {
    const tree = renderer.create(
      <Button className="test">
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('test');
  });

  test('renders Button with variant', async () => {
    const tree = renderer.create(
      <Button variant={ButtonVariant.TEXT}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain(ButtonVariant.TEXT);
  });

  test('renders Button with size', async () => {
    const tree = renderer.create(
      <Button size={Size.SMALL}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain(Size.SMALL);
  });

  test('renders Button with color', async () => {
    const tree = renderer.create(
      <Button color={Color.SECONDARY}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain(Color.SECONDARY);
  });

  test('renders Button with rounded', async () => {
    const tree = renderer.create(
      <Button rounded>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('rounded');
  });

  test('renders Button with gradient', async () => {
    const tree = renderer.create(
      <Button gradient>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('gradient');
  });

  test('renders Button with relief', async () => {
    const tree = renderer.create(
      <Button relief>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('relief');
  });

  test('renders Button with popped', async () => {
    const tree = renderer.create(
      <Button popped>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('popped');
  });

  test('renders Button popped with group', async () => {
    const tree = renderer.create(
      <Button popped group>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toTree()?.props.className).not.toContain('popped');
  });

  test('renders Button with startIcon', async () => {
    const tree = renderer.create(
      <Button startIcon={icon}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('span');
    expect(((tree.root.children[0] as ReactTestInstance).children[1] as ReactTestInstance).type).toBe('div');
  });

  test('renders Button with endIcon', async () => {
    const tree = renderer.create(
      <Button endIcon={icon}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('div');
    expect(((tree.root.children[0] as ReactTestInstance).children[1] as ReactTestInstance).type).toBe('span');
  });

  test('renders Button with icons', async () => {
    const tree = renderer.create(
      <Button startIcon={icon} endIcon={icon}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('span');
    expect(((tree.root.children[0] as ReactTestInstance).children[1] as ReactTestInstance).type).toBe('div');
    expect(((tree.root.children[0] as ReactTestInstance).children[2] as ReactTestInstance).type).toBe('span');
  });

  test('renders Button with group', async () => {
    const tree = renderer.create(
      <Button group>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('group');
    expect(tree.toTree()?.props.className).toContain('row');
  });

  test('renders Button with group column', async () => {
    const tree = renderer.create(
      <Button group groupDirection={ButtonGroupDirection.COLUMN}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('group');
    expect(tree.toTree()?.props.className).toContain('column');
  });

  test('renders Button without ripple', async () => {
    const tree = renderer.create(
      <Button ripple={false}>
        <div>Test</div>
      </Button>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect((tree.root.children[0] as ReactTestInstance).children.length).toBe(1);
  });
});
