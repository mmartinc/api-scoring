import styles from './progress-bar.module.css';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export type ProgressBarProps = ProgressPrimitive.ProgressProps;

export const ProgressBar = (props: ProgressBarProps) => {
  const percentage = ((props.value ?? 1) / (props.max ? props.max : 1)) * 100;

  return (
    <ProgressPrimitive.Root
      className={styles.container}
      value={props.value}
      max={props.max}
    >
      <ProgressPrimitive.Indicator
        className={styles.progress}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
