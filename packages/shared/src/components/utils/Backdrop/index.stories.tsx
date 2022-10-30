import { Story } from '@storybook/react';

import Backdrop from 'src/components/utils/Backdrop/index';
import styles from 'src/styles/storybook.css';

export default {
  title: 'atoms/utils/Backdrop',
  component: Backdrop,
};

const StandardTemplate: Story = () => {
  return (
    <div className={styles.box}>
      Box
      <Backdrop />
    </div>
  );
};

export const Standard = StandardTemplate.bind({});
