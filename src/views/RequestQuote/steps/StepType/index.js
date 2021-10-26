import Radio from "../../components/Radio";

import styles from "../Steps.module.scss";

export default function StepType({ selected, onChange }) {
  return (
    <fieldset>
      <legend className={styles.title}>
        I'm looking for <strong>Just Materials</strong> or{" "}
        <strong>Materials & Labour</strong>...
      </legend>

      <p className={styles.lead}>
        Choose whether you want materials only or a local tradesperson to do the
        job for you too.
      </p>

      <div className={styles.grid}>
        <Radio
          name="type"
          value="Supply of Materials Only"
          checked={selected === "Supply of Materials Only"}
          onClick={onChange}
          onChange={onChange}
          title="Supply of Materials Only"
          text="I'm just looking for materials to be delivered and don't require any labour."
          image="/images/request-quote/type-materials.svg"
        />

        <Radio
          name="type"
          value="Materials & Labour"
          checked={selected === "Materials & Labour"}
          onClick={onChange}
          onChange={onChange}
          title="Materials & Labour"
          text="I would like a local tradesperson to do the job for me."
          image="/images/request-quote/type-labour.svg"
        />
      </div>
    </fieldset>
  );
}
