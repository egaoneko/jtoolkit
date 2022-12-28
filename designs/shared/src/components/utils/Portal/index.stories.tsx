import { Story } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import Portal, { PortalProps } from 'src/components/utils/Portal/index';
import styles from 'src/styles/storybook.css';

export default {
  title: 'atoms/utils/Portal',
  component: Portal,
};

const BodyTemplate: Story<PortalProps> = args => {
  return (
    <Portal {...args}>
      <span>Portal to Body</span>
    </Portal>
  );
};

export const Body = BodyTemplate.bind({});

const ContainerTemplate: Story<PortalProps> = args => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(!!ref.current);
  }, [ref]);
  return (
    <>
      <div className={styles.col}>
        Target
        <div className={styles.box} ref={ref} />
      </div>
      {mounted && (
        <Portal {...args} container={ref.current}>
          <span>Portal to Container</span>
        </Portal>
      )}
    </>
  );
};

export const Container = ContainerTemplate.bind({});
