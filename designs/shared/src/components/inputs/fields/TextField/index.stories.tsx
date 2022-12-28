import { Story } from '@storybook/react';

import { Size } from 'src/enums/size';
import SvgIcon from 'src/components/displays/icons/SvgIcon';
import styles from 'src/styles/storybook.css';
import { FieldVariant } from 'src/enums/field';
import TextField, { TextFieldProps } from 'src/components/inputs/fields/TextField/index';

export default {
  title: 'atoms/inputs/fields/TextField',
  component: TextField,
};

const StandardTemplate: Story<TextFieldProps> = args => (
  <div className={styles.col}>
    <TextField {...args} variant={FieldVariant.STANDARD} defaultValue={'Standard'} />
    <TextField {...args} variant={FieldVariant.OUTLINED} defaultValue={'Outlined'} />
    <TextField {...args} variant={FieldVariant.FILLED} defaultValue={'Filled'} />
  </div>
);

export const Standard = StandardTemplate.bind({});
Standard.args = {
  size: Size.MEDIUM,
  disabled: false,
  rounded: false,
};

const IconTemplate: Story<TextFieldProps> = args => {
  const icon = (
    <SvgIcon size={args.size}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );

  return (
    <div className={styles.row}>
      <TextField {...args} startIcon={icon} defaultValue={'Start'} />
      <TextField {...args} endIcon={icon} defaultValue={'End'} />
    </div>
  );
};

export const Icon = IconTemplate.bind({});
Icon.args = {
  size: Size.MEDIUM,
  variant: FieldVariant.STANDARD,
};
