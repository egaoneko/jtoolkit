import { FC, useCallback, useRef, useEffect } from 'react';

import styles from 'src/components/bases/effects/Ripple/index.module.css';

export interface RippleProps {
  parentRef?: React.RefObject<HTMLElement>;
  center?: boolean;
  disabled?: boolean;
}

const Ripple: FC<RippleProps> = ({ parentRef, disabled, center }) => {
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleOnClick = useCallback(
    (event: HTMLElementEventMap['click']) => {
      if (!rippleRef.current || disabled) {
        return;
      }

      rippleEffect(event, rippleRef.current, center);
    },
    [rippleRef, disabled, center],
  );

  useEffect(() => {
    if (!parentRef?.current) {
      return;
    }
    const parent = parentRef.current;

    parent.addEventListener('click', handleOnClick);
    return () => {
      parent.removeEventListener('click', handleOnClick);
    };
  }, [parentRef, handleOnClick]);

  return <span ref={rippleRef} className={styles.ripple} />;
};

export default Ripple;

function rippleEffect(event: HTMLElementEventMap['click'], ripple: HTMLSpanElement, center = false): void {
  const { left, top, width, height } = ripple.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(width, height);
  const radius = diameter / 2;

  let x = event.clientX - left;
  let y = event.clientY - top;

  if (center) {
    x = width * 0.5;
    y = height * 0.5;
  }

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${x - radius}px`;
  circle.style.top = `${y - radius}px`;
  circle.classList.add(styles.effect);
  circle.addEventListener('animationend', () => circle.remove());

  const effect = ripple.getElementsByClassName(styles.effect)[0];
  if (effect) {
    effect.remove();
  }

  ripple.appendChild(circle);
}
