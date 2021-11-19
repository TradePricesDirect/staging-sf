import Link from "next/link";
import clsx from "clsx";
import useCheckoutStepState from "hooks/useCheckoutStepState";

import styles from "./CheckoutProgressBar.module.scss";
import { Fragment } from "react";

const CheckoutProgressBar = ({ steps, activeStep }) => {
  const { maxPossibleStep } = useCheckoutStepState();

  const activeStepIndex = activeStep.index;

  return (
    <nav className={styles.wrap}>
      <ul className={styles.list}>
        {steps?.map((step, index) => (
          <Fragment key={`step-${step.index}`}>
            {index !== 0 && <li className={styles.line} />}

            <li className={styles.listItem}>
              <Step
                step={step}
                activeStepIndex={activeStepIndex}
                maxPossibleStep={maxPossibleStep}
                numberOfSteps={steps.length}
              />
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default CheckoutProgressBar;

const Step = ({ step, activeStepIndex, maxPossibleStep, numberOfSteps }) => {
  const isDisabled = step.index > maxPossibleStep;

  const isActive = step.index === activeStepIndex;

  if (isDisabled) {
    return (
      <button
        type="button"
        className={clsx(styles.link, isActive && styles.active)}
        disabled
      >
        0{step.index}
        <Label
          stepIndex={step.index}
          name={step.name}
          numberOfSteps={numberOfSteps}
        />
      </button>
    );
  }

  return (
    <Link href={step.link}>
      <a className={clsx(styles.link, isActive && styles.active)}>
        0{step.index}
        <Label
          stepIndex={step.index}
          name={step.name}
          numberOfSteps={numberOfSteps}
        />
      </a>
    </Link>
  );

  // return (
  //   <div className={styles.step}>
  //     {isDisabled ? (
  //       <span className={styles.link}>
  //         <Dot stepIndex={step.index} activeStepIndex={activeStepIndex} />

  //         <Label
  //           stepIndex={step.index}
  //           name={step.name}
  //           numberOfSteps={numberOfSteps}
  //         />
  //       </span>
  //     ) : (
  //       <Link href={step.link}>
  //         <a className={styles.link}>
  //           <Dot stepIndex={step.index} activeStepIndex={activeStepIndex} />

  //           <Label
  //             stepIndex={step.index}
  //             name={step.name}
  //             numberOfSteps={numberOfSteps}
  //           />
  //         </a>
  //       </Link>
  //     )}

  //     <ProgressBar
  //       stepIndex={step.index}
  //       activeStepIndex={activeStepIndex}
  //       numberOfSteps={numberOfSteps}
  //     />
  //   </div>
  // );
};

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
  if (stepIndex === 1) {
    return <span className={clsx(styles.label, styles.first)}>{name}</span>;
  }

  if (stepIndex === numberOfSteps) {
    return <span className={clsx(styles.label, styles.last)}>{name}</span>;
  }

  return <span className={styles.label}>{name}</span>;
};

const ProgressBar = ({ stepIndex, activeStepIndex, numberOfSteps }) => {
  if (stepIndex === numberOfSteps) return null;

  return (
    <div
      className={clsx(styles.bar, activeStepIndex > stepIndex && styles.done)}
    />
  );
};
