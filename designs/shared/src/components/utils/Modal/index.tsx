import { ElementType, forwardRef, ReactElement, ReactNode, useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useToggle, useClickAway, useUnmount } from 'react-use';
import { useForkRef } from '@jtoolkit/util';

import Portal from 'src/components/utils/Portal';
import Container, { ContainerProps } from 'src/components/bases/layouts/Container';
import { Size } from 'src/enums';
import DefaultBackdrop, { BackdropProps } from 'src/components/utils/Backdrop';
import styles from 'src/components/utils/Modal/index.module.css';

export interface ModalProps extends Pick<ContainerProps, 'size' | 'rounded' | 'shadow'> {
  open?: boolean;
  onClose?: () => unknown;
  closeAfterTransition?: boolean;
  disableClickAway?: boolean;
  Backdrop?: ElementType;
  backdropProps?: BackdropProps;
  hideBackdrop?: boolean;
  children?: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open = false,
    onClose,
    size = Size.EXTRA_SMALL,
    rounded = true,
    shadow = true,
    closeAfterTransition = false,
    disableClickAway = false,
    Backdrop = DefaultBackdrop,
    backdropProps,
    hideBackdrop = false,
    children,
  },
  ref,
): ReactElement | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(modalRef, ref);
  const [isOpen, setIsOpen] = useToggle(open);

  const handleOpen = useCallback((): void => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback((): void => {
    setIsOpen(false);

    if (!closeAfterTransition) {
      onClose?.();
    }
  }, [setIsOpen, closeAfterTransition, onClose]);

  const handleCloseAfterTransition = useCallback((): void => {
    onClose?.();
  }, [onClose]);

  useUnmount(() => {
    handleClose();
  });

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open, handleOpen, handleClose]);

  useClickAway(modalRef, () => {
    if (disableClickAway || !open) {
      return;
    }
    handleClose();
  });

  return (
    <CSSTransition
      unmountOnExit
      in={isOpen}
      classNames={styles}
      timeout={225}
      onExited={closeAfterTransition ? handleCloseAfterTransition : undefined}
    >
      <Portal>
        <div className={styles.root}>
          {!hideBackdrop && Backdrop ? <Backdrop {...backdropProps} /> : null}
          <Container ref={handleRef} className={styles.container} size={size} rounded={rounded} shadow={shadow}>
            {children}
          </Container>
        </div>
      </Portal>
    </CSSTransition>
  );
});

export default Modal;
