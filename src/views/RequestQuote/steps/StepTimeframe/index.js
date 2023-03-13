import { useEffect, useState } from "react";
import Radio from "../../components/Radio";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Button from 'components/atoms/Button'

import styles from "../Steps.module.scss";

const StepTimeframe = ({ selected, onChange, onContinue }) => {

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
              <h2 className={styles.header}>How soon would you like to start?</h2>
              <h4 className={styles.subheader}>Let us know roughly when you&apos;re looking to start your project, or if
        you&apos;re just browsing.</h4>
            </div>
          </div>
        </div>
      </header>
      <fieldset className={styles.fieldsetContainer}>
        <div className={styles.grid}>
          <Radio
            name="timeframe"
            value="ASAP"
            checked={select === "ASAP"}
            onClick={handleChange}
            onChange={handleChange}
            title="ASAP"
            text="I would like to start this project as soon as possible."
          />

          <Radio
            name="timeframe"
            value="Within One Month"
            checked={select === "Within One Month"}
            onClick={handleChange}
            onChange={handleChange}
            title="Within One Month"
            text="I would like to start this project within the next month."
          />

          <Radio
            name="timeframe"
            value="Within Three Months"
            checked={select === "Within Three Months"}
            onClick={handleChange}
            onChange={handleChange}
            title="Within Three Months"
            text="I would like to start this project within the next three months."
          />

          <Radio
            name="timeframe"
            value="Just Browsing"
            checked={select === "Just Browsing"}
            onClick={handleChange}
            onChange={handleChange}
            title="Just Browsing"
            text="I have no plans yet and am just browsing for ideas."
          />
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

export default StepTimeframe;
