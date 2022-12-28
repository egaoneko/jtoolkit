import { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';

import { Size } from 'src/enums/size';
import styles from 'src/components/bases/layouts/Container/index.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  rounded?: boolean;
  shadow?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = Size.SMALL, rounded = false, shadow = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx(
        styles.container,
        styles[size],
        {
          [styles.rounded]: rounded,
          [styles.shadow]: shadow,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Container;
