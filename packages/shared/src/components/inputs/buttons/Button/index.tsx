import { ButtonHTMLAttributes, useRef, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { useForkRef } from '@toolkit/util';

import { Color } from 'src/enums/color';
import { ButtonGroupDirection, ButtonVariant } from 'src/enums/button';
import { Size } from 'src/enums/size';
import Ripple from 'src/components/bases/effects/Ripple';
import styles from 'src/components/inputs/buttons/Button/index.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  color?: Color;
  disabled?: boolean;
  rounded?: boolean;
  popped?: boolean;
  gradient?: boolean;
  relief?: boolean;
  ripple?: boolean;
  rippleCenter?: boolean;
  group?: boolean;
  groupDirection?: ButtonGroupDirection;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = ButtonVariant.CONTAINED,
    size = Size.MEDIUM,
    color = Color.PRIMARY,
    disabled = false,
    rounded = false,
    popped = false,
    gradient = false,
    relief = false,
    ripple = true,
    rippleCenter = false,
    group = false,
    groupDirection = ButtonGroupDirection.ROW,
    startIcon,
    endIcon,
    className,
    children,
    ...props
  },
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleRef = useForkRef(buttonRef, ref);

  return (
    <button
      ref={handleRef}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[color],
        {
          [styles.rounded]: rounded,
          [styles.gradient]: gradient,
          [styles.relief]: relief,
          [styles.popped]: !group && popped,
          [styles.group]: group,
          [styles[groupDirection]]: group,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
      {ripple && <Ripple parentRef={buttonRef} center={rippleCenter} />}
    </button>
  );
});

export default Button;
