import Radio from "../../components/Radio";

import styles from "../Steps.module.scss";

const StepTimeframe = ({ selected, onChange }) => {
  return (
    <fieldset>
      <legend className={styles.title}>
        My <strong>timeframe</strong> for starting is...
      </legend>

      <p className={styles.lead}>
        Let us know roughly when you're looking to start your project, or if
        you're just browsing.
      </p>

      <div className={styles.grid}>
        <Radio
          name="timeframe"
          value="ASAP"
          checked={selected === "ASAP"}
          onClick={onChange}
          onChange={onChange}
          title="ASAP"
          text="I would like to start this project as soon as possible."
          image="/images/request-quote/timeframe-asap.svg"
        />

        <Radio
          name="timeframe"
          value="Within One Month"
          checked={selected === "Within One Month"}
          onClick={onChange}
          onChange={onChange}
          title="Within One Month"
          text="I would like to start this project within the next month."
          image="/images/request-quote/timeframe-one-month.svg"
        />

        <Radio
          name="timeframe"
          value="Within Three Months"
          checked={selected === "Within Three Months"}
          onClick={onChange}
          onChange={onChange}
          title="Within Three Months"
          text="I would like to start this project within the next three months."
          image="/images/request-quote/timeframe-three-months.svg"
        />

        <Radio
          name="timeframe"
          value="Just Browsing"
          checked={selected === "Just Browsing"}
          onClick={onChange}
          onChange={onChange}
          title="Just Browsing"
          text="I have no plans yet and am just browsing for ideas."
          image="/images/request-quote/timeframe-browsing.svg"
        />
      </div>
    </fieldset>
  );
};

export default StepTimeframe;
