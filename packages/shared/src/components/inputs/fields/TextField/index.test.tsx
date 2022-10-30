import renderer, { ReactTestInstance } from 'react-test-renderer';

import { Color, Size } from 'src/enums';
import SvgIcon from 'src/components/displays/icons/SvgIcon';
import TextField from 'src/components/inputs/fields/TextField/index';
import { FieldVariant } from 'src/enums/field';

describe('TextField Snapshots', () => {
  const icon = (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );

  test('renders TextField with default options', async () => {
    const tree = renderer.create(<TextField />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('div');
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0] as ReactTestInstance)
        .type,
    ).toBe('input');
  });

  test('renders TextField with default', async () => {
    const tree = renderer.create(<TextField defaultValue="Test" />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0] as ReactTestInstance)
        .props.defaultValue,
    ).toBe('Test');
  });

  test('renders TextField with variant', async () => {
    const tree = renderer.create(<TextField variant={FieldVariant.STANDARD} />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).props.className).toContain(
      FieldVariant.STANDARD,
    );
  });

  test('renders TextField with size', async () => {
    const tree = renderer.create(<TextField size={Size.SMALL} />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).props.className).toContain(
      Size.SMALL,
    );
  });

  test('renders TextField with color', async () => {
    const tree = renderer.create(<TextField color={Color.SECONDARY} />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).props.className).toContain(
      Color.SECONDARY,
    );
  });

  test('renders TextField with rounded', async () => {
    const tree = renderer.create(<TextField rounded />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).props.className).toContain(
      'rounded',
    );
  });

  test('renders TextField with startIcon', async () => {
    const tree = renderer.create(<TextField startIcon={icon} />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0] as ReactTestInstance)
        .type,
    ).toBe('span');
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[1] as ReactTestInstance)
        .type,
    ).toBe('input');
  });

  test('renders TextField with endIcon', async () => {
    const tree = renderer.create(<TextField endIcon={icon} />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0] as ReactTestInstance)
        .type,
    ).toBe('input');
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[1] as ReactTestInstance)
        .type,
    ).toBe('span');
  });

  test('renders TextField with icons', async () => {
    const tree = renderer.create(<TextField startIcon={icon} endIcon={icon} />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0] as ReactTestInstance)
        .type,
    ).toBe('span');
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[1] as ReactTestInstance)
        .type,
    ).toBe('input');
    expect(
      (((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[2] as ReactTestInstance)
        .type,
    ).toBe('span');
  });
});
