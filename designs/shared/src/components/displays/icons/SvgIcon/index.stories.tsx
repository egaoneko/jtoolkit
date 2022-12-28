import { Story } from '@storybook/react';

import { Size } from 'src/enums/size';
import styles from 'src/styles/storybook.css';
import SvgIcon, { SvgIconProps } from 'src/components/displays/icons/SvgIcon/index';

export default {
  title: 'atoms/displays/icons/SvgIcon',
  component: SvgIcon,
};

const StandardTemplate: Story<SvgIconProps> = args => {
  const icon = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
  return (
    <div className={styles.row}>
      <div className={styles.primary}>
        <SvgIcon {...args}>{icon}</SvgIcon>
      </div>
      <div className={styles.secondary}>
        <SvgIcon {...args}>{icon}</SvgIcon>
      </div>
      <div className={styles.success}>
        <SvgIcon {...args}>{icon}</SvgIcon>
      </div>
      <div className={styles.danger}>
        <SvgIcon {...args}>{icon}</SvgIcon>
      </div>
      <div className={styles.warning}>
        <SvgIcon {...args}>{icon}</SvgIcon>
      </div>
      <div className={styles.info}>
        <SvgIcon {...args}>{icon}</SvgIcon>
      </div>
    </div>
  );
};

export const Standard = StandardTemplate.bind({});

Standard.args = {
  size: Size.MEDIUM,
  stroked: false,
  filled: true,
};
