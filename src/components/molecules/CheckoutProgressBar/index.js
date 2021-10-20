import Link from "next/link";
import clsx from "clsx";

import styles from "./CheckoutProgressBar.module.scss";

const CheckoutProgressBar = ({ steps, activeStepIndex }) => {
  return (
    <div className={styles.wrap}>
      {steps?.map((step, index) => {
        return (
          <div key={step.index} className={styles.step}>
            <Link href={step.link}>
              <a className={styles.link}>
                <Dot stepIndex={index} activeStepIndex={activeStepIndex} />

                <Label
                  stepIndex={index}
                  name={step.name}
                  numberOfSteps={steps.length}
                />
              </a>
            </Link>

            <ProgressBar
              stepIndex={index}
              activeStepIndex={activeStepIndex}
              numberOfSteps={steps.length}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutProgressBar;

const Dot = ({ stepIndex, activeStepIndex }) => {
  if (stepIndex < activeStepIndex) {
    return <div className={clsx(styles.dot, styles.done)} />;
  }
  if (stepIndex === activeStepIndex) {
    return <div className={clsx(styles.dot, styles.active)} />;
  }
  if (stepIndex > activeStepIndex) {
    return <div className={styles.dot} />;
  }
};

const Label = ({ stepIndex, name, numberOfSteps }) => {
  if (stepIndex === 0) {
    return <span className={clsx(styles.label, styles.first)}>{name}</span>;
  }

  if (stepIndex === numberOfSteps - 1) {
    return <span className={clsx(styles.label, styles.last)}>{name}</span>;
  }

  return <span className={styles.label}>{name}</span>;
};

const ProgressBar = ({ stepIndex, activeStepIndex, numberOfSteps }) => {
  if (stepIndex === numberOfSteps - 1) return null;

  return (
    <div
      className={clsx(styles.bar, activeStepIndex > stepIndex && styles.done)}
    />
  );
};
