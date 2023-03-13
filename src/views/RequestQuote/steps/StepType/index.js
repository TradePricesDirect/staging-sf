import { useEffect, useState } from "react";
import Radio from "../../components/Radio";
import {faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Button from 'components/atoms/Button'

import styles from "../Steps.module.scss";

export default function StepType({ selected, onChange, onContinue }) {

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
              <h2 className={styles.header}>Are you looking for a Fitter for you project?</h2>
              <h4 className={styles.subheader}>If you&apos;re not DIY savy, we can help find a local fitter</h4>
            </div>
          </div>
        </div>
      </header>
      <fieldset className={styles.fieldsetContainer}>
          <div className={styles.grid}>
            <Radio
              name="type"
              value="Just Materials"
              checked={select === "Just Materials"}
              onClick={handleChange}
              onChange={handleChange}
              title="Just Materials"
              text="I'm just looking for materials to be delivered to me"
            />

            <Radio
              name="type"
              value="Materials & Labour"
              checked={select === "Materials & Labour"}
              onClick={handleChange}
              onChange={handleChange}
              title="Materials & Labour"
              text="I'm interested in speaking to a review local fitter about my project"
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
}
