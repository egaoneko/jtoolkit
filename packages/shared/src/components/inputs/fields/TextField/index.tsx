import { InputHTMLAttributes, useRef, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { useForkRef } from '@jtoolkit/util';

import { Color } from 'src/enums/color';
import { Size } from 'src/enums/size';
import { FieldVariant } from 'src/enums/field';
import styles from 'src/components/inputs/fields/TextField/index.module.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: FieldVariant;
  size?: Size;
  color?: Color;
  disabled?: boolean;
  rounded?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function Button(
  {
    variant = FieldVariant.STANDARD,
    size = Size.MEDIUM,
    color = Color.PRIMARY,
    disabled = false,
    rounded = false,
    startIcon,
    endIcon,
    ...props
  },
  ref,
) {
  const buttonRef = useRef<HTMLInputElement>(null);
  const handleRef = useForkRef(buttonRef, ref);

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.container, styles[size], styles[variant], color ? styles[color] : '', {
          [styles.rounded]: rounded,
          [styles.disabled]: disabled,
        })}
      >
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        <input ref={handleRef} className={styles.input} disabled={disabled} {...props} />
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </div>
    </div>
  );
});

export default TextField;
