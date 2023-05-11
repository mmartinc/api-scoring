import styles from './step-section.module.css';

export type StepSectionProps = {
  stepLabel: string;
  stepDescription?: string;
  children: React.ReactNode;
};

export const StepSection = ({
  stepLabel,
  stepDescription,
  children,
}: StepSectionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.stepLabel}>{stepLabel}</h2>
      {stepDescription && (
        <span className={styles.stepDescription}>{stepDescription}</span>
      )}
      {children}
    </div>
  );
};
