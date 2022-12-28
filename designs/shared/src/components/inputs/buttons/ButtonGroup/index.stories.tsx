import { Story } from '@storybook/react';

import { ButtonGroupDirection } from 'src/enums/button';
import Button from 'src/components/inputs/buttons/Button';
import ButtonGroup, { ButtonGroupProps } from 'src/components/inputs/buttons/ButtonGroup/index';

export default {
  title: 'atoms/inputs/buttons/ButtonGroup',
  component: ButtonGroup,
};

const StandardTemplate: Story<ButtonGroupProps> = args => (
  <ButtonGroup {...args}>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
);

export const Standard = StandardTemplate.bind({});
Standard.args = {
  direction: ButtonGroupDirection.ROW,
};
