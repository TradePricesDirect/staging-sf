import { useEffect, useState } from "react";
import Radio from "../../components/Radio";
import {faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Button from 'components/atoms/Button'

import styles from "../Steps.module.scss";

const StepFinance = ({ selected, onChange, onContinue }) => {

  const [select, setSelected] = useState(selected);

  useEffect(() => {
    setSelected(selected)
  }, [selected]);

  const handleChange = (e) => {
    setSelected(e.target.value)
    onChange(e)
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <div className="container">
          <div className="row">
            <div className="col-12 m-auto">
              <h2 className={styles.header}>Are you interested in arranging finance?</h2>
              <h4 className={styles.subheader}>Get up to £25,000 and spread the cost over 10 years</h4>
            </div>
          </div>
        </div>
      </header>
      <fieldset className={styles.fieldsetContainer}>

        <div className="row">
          <div className="col-md">
            <Radio
              name="finance"
              value="No"
              checked={select === "No"}
              onClick={handleChange}
              onChange={handleChange}
              title="Pay Upfront"
              text="I'm happy to pay the full amount upfront in one payment"
            />
          </div>

          <div className="col-md">
            <Radio
              name="finance"
              value="Yes"
              checked={select === "Yes"}
              onClick={handleChange}
              onChange={handleChange}
              title="Spread the Cost"
              text="I'd be interested in learning more about finance options"
            />
          </div>
        </div>
        {select && (
                    <div className={styles.buttonWrap}>
                        <Button onClick={onContinue} color="secondary" label="Continue" icon={faArrowRight} />
                    </div>
                )}
      </fieldset>
    </>
  );
};

export default StepFinance;
