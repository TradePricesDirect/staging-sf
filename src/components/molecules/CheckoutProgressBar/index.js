import Link from "next/link";
import clsx from "clsx";
import useCheckoutStepState from "hooks/useCheckoutStepState";
import { icons } from "core/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <li className={styles.listItemSupport}>
          <Link href="" className={clsx(styles.link)}>
            <FontAwesomeIcon className={styles.icon} icon={icons.faQuestionCircle} />Support</Link>
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutProgressBar;

const Step = ({ step, activeStepIndex, maxPossibleStep, numberOfSteps }) => {
  const isDisabled = step.index > maxPossibleStep;

  const isActive = step.index <= activeStepIndex;
  const isCurrent = step.index === activeStepIndex;

  if (isDisabled) {
    return (
      <span className={clsx(styles.link, styles.disabled)} disabled href={step.link}>
        {`${step.index}. ${step.name}`}
      </span>
    );
  }

  return (
    <Link className={clsx(styles.link, isActive && styles.active, isCurrent && styles.current)} href={step.link}>
      {`${step.index}. ${step.name}`}
    </Link>
  );
};


