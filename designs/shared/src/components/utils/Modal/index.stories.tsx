import { Story } from '@storybook/react';
import { useToggle } from 'react-use';

import Modal, { ModalProps } from 'src/components/utils/Modal/index';
import { Size } from 'src/enums';
import { Button } from 'src/components/inputs';

export default {
  title: 'atoms/utils/Modal',
  component: Modal,
};

const StandardTemplate: Story<ModalProps> = args => {
  const [isOpen, setIsOpen] = useToggle(false);

  return (
    <>
      <Button onClick={setIsOpen} disabled={isOpen}>
        Open Modal
      </Button>
      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <span>Modal</span>
      </Modal>
    </>
  );
};

export const Standard = StandardTemplate.bind({});
Standard.args = {
  size: Size.SMALL,
  rounded: true,
  shadow: true,
  closeAfterTransition: false,
  disableClickAway: false,
  hideBackdrop: false,
};
