import { Story } from '@storybook/react';

import { Size } from 'src/enums/size';
import styles from 'src/styles/storybook.css';
import Container, { ContainerProps } from 'src/components/bases/layouts/Container/index';

export default {
  title: 'atoms/bases/layouts/Container',
  component: Container,
};

const StandardTemplate: Story<ContainerProps> = args => (
  <div className={styles.col}>
    <Container className={styles.box} {...args} />
  </div>
);

export const Standard = StandardTemplate.bind({});

Standard.args = {
  size: Size.EXTRA_SMALL,
  rounded: true,
  shadow: true,
};
