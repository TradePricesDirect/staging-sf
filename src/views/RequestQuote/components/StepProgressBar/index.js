import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'components/atoms/Button'

import styles from "./StepProgressBar.module.scss";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";

const steps = [{
  name: "Your project"
}, {
  name: "Labour"
}, {
  name: "Finance"
}, {
  name: "Finish"
}]

const StepProgressBar = ({ step, onClick, onPrevious }) => {
  return (
    <nav className={styles.wrap}>
      { step > 0 && (
      <button className={styles.backButton} onClick={onPrevious}>   <FontAwesomeIcon icon={faArrowLeft} /></button>
      )}
      <ul className={styles.list}>
        {steps?.map((stepItem, index) => (
          <Fragment key={`step-${index}`}>
            <li className={styles.listItem}>
              <Step
                step={{
                  index: index,
                  link: '#',
                  name: stepItem.name
                }}
                onClick={onClick}
                activeStepIndex={step}
                maxPossibleStep={step}
                numberOfSteps={3}
              />
            </li>

          </Fragment>
        ))}

        <li className={styles.listItemSupport}>
          <a href="mailto:hello@tradepricesdirect.com" className={clsx(styles.link)}>
            <FontAwesomeIcon className={styles.icon} icon={faQuestionCircle} />Support</a>
        </li>
      </ul>
    </nav>

  );
};

const Step = ({ step, activeStepIndex, maxPossibleStep, onClick }) => {
  const isDisabled = step.index > maxPossibleStep;

  const isActive = step.index <= activeStepIndex;
  const isCurrent = step.index === activeStepIndex;

  if (isDisabled) {
    return (
      <span className={clsx(styles.link, styles.disabled)} disabled href={step.link}>
        {`Q${step.index + 1}. ${step.name}`}
      </span>
    );
  }

  return (
    <a onClick={() => { onClick(step.index) }} className={clsx(styles.link, isActive && styles.active, isCurrent && styles.current)} href={step.link}>
      {`Q${step.index + 1}. ${step.name}`}
    </a>
  );
};


export default StepProgressBar;
