import { Story } from '@storybook/react';
import { useRef } from 'react';

import styles from 'src/styles/storybook.css';
import Ripple, { RippleProps } from 'src/components/bases/effects/Ripple/index';

export default {
  title: 'atoms/bases/effects/Ripple',
  component: Ripple,
};

const StandardTemplate: Story<RippleProps> = args => {
  const parentRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={parentRef} className={styles.box}>
      Ripple Parent
      <Ripple {...args} parentRef={parentRef} />
    </div>
  );
};

export const Standard = StandardTemplate.bind({});
Standard.args = {
  disabled: false,
  center: false,
};
