import { cloneElement, forwardRef } from 'react';
import clsx from 'clsx';
import { toChildrenArray } from '@toolkit/util';

import { ButtonGroupDirection } from 'src/enums/button';
import { ButtonProps } from 'src/components/atoms/inputs/buttons/Button';

import styles from './index.module.css';

export interface ButtonGroupProps {
  direction?: ButtonGroupDirection;
}

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { direction = ButtonGroupDirection.ROW, children },
  ref,
) {
  return (
    <div ref={ref} className={clsx(styles.group, styles[direction])}>
      {renderButtons(toChildrenArray<ButtonProps>(children), direction)}
    </div>
  );
});

export default ButtonGroup;

function renderButtons(children: React.ReactElement<ButtonProps>[], direction: ButtonGroupDirection): React.ReactNode {
  return children.map((child, index) =>
    cloneElement(child, { key: `__buttons-${index}`, group: true, groupDirection: direction, ...child.props }),
  );
}
