import { Story } from '@storybook/react';

import { Color } from 'src/enums/color';
import { ButtonVariant } from 'src/enums/button';
import { Size } from 'src/enums/size';
import SvgIcon from 'src/components/displays/icons/SvgIcon';
import { ButtonProps } from 'src/components/inputs/buttons/Button';
import styles from 'src/styles/storybook.css';
import IconButton from 'src/components/inputs/buttons/IconButton/index';

export default {
  title: 'atoms/inputs/buttons/IconButton',
  component: IconButton,
};

const StandardTemplate: Story<ButtonProps> = args => {
  return (
    <div className={styles.row}>
      <IconButton {...args}>
        <SvgIcon size={args.size} color={args.color}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      </IconButton>
    </div>
  );
};

export const Standard = StandardTemplate.bind({});
Standard.args = {
  size: Size.MEDIUM,
  color: Color.PRIMARY,
  variant: ButtonVariant.CONTAINED,
  rounded: false,
};
