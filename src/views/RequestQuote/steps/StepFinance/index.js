import Radio from "../../components/Radio";

import styles from "../Steps.module.scss";

const StepFinance = ({ selected, onChange }) => {
  return (
    <fieldset>
      <legend className={styles.title}>
        Are you looking to <strong>finance</strong> & spread the cost...
      </legend>

      <p className={styles.lead}>
        You can spread the cost of your purchase with affordable finance
        options.
      </p>

      <div className="row">
        <div className="col-md">
          <Radio
            name="finance"
            value="No"
            checked={selected === "No"}
            onClick={onChange}
            onChange={onChange}
            title="No"
            text="I would like to pay for this project upfront in full."
            image="/images/request-quote/finance-no.svg"
          />
        </div>

        <div className="col-md">
          <Radio
            name="finance"
            value="Yes"
            checked={selected === "Yes"}
            onClick={onChange}
            onChange={onChange}
            title="Yes"
            text="I would like to finance this project and spread the cost."
            image="/images/request-quote/finance-yes.svg"
          />
        </div>
      </div>
    </fieldset>
  );
};

export default StepFinance;
