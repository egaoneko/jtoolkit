import renderer from 'react-test-renderer';

import Ripple from 'src/components/bases/effects/Ripple/index';

describe('Ripple Snapshots', () => {
  test('renders Ripple with default options', async () => {
    const tree = renderer.create(<Ripple />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
