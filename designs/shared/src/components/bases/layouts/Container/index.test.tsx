import renderer, { ReactTestInstance } from 'react-test-renderer';

import Container from 'src/components/bases/layouts/Container/index';
import { Size } from 'src/enums';

describe('Container Snapshots', () => {
  test('renders Container with default options', async () => {
    const tree = renderer.create(
      <Container>
        <div>Test</div>
      </Container>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).type).toBe('div');
    expect(((tree.root.children[0] as ReactTestInstance).children[0] as ReactTestInstance).children[0]).toBe('Test');
    expect(tree.toTree()?.props.className).toContain('small');
  });

  test('renders Container with class', async () => {
    const tree = renderer.create(
      <Container className="test">
        <div>Test</div>
      </Container>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('test');
  });

  test('renders Container with size', async () => {
    const tree = renderer.create(
      <Container size={Size.MEDIUM}>
        <div>Test</div>
      </Container>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('medium');
  });

  test('renders Container with rounded', async () => {
    const tree = renderer.create(
      <Container rounded>
        <div>Test</div>
      </Container>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('rounded');
  });

  test('renders Container with shadow', async () => {
    const tree = renderer.create(
      <Container shadow>
        <div>Test</div>
      </Container>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.toTree()?.props.className).toContain('shadow');
  });
});
