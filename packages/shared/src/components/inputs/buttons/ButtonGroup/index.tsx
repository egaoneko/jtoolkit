import { cloneElement, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { toChildrenArray } from '@jtoolkit/util';

import { ButtonGroupDirection } from 'src/enums/button';
import { ButtonProps } from 'src/components/inputs/buttons/Button';
import styles from 'src/components/inputs/buttons/ButtonGroup/index.module.css';

export interface ButtonGroupProps {
  direction?: ButtonGroupDirection;
  children?: ReactNode;
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
