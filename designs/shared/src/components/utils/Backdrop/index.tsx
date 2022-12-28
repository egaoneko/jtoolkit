import { forwardRef, HTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';

import styles from 'src/components/utils/Backdrop/index.module.css';

export type BackdropProps = HTMLAttributes<HTMLDivElement>;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(
  { className, ...props },
  ref,
): ReactElement | null {
  return <div {...props} className={clsx(styles.container, className)} ref={ref} />;
});

export default Backdrop;
