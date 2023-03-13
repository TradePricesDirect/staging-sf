import clsx from "clsx";
import Accordion from "components/molecules/Accordion";

import styles from "./FAQ.module.scss";

const FAQ = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h2 className={styles.title}>Not convinced? Check out our FAQ</h2>

        <Accordion title="Sounds too good to be true, what's the catch?" open>
          <p>
            {`There is no catch, we have spent years developing our platform and
            wanted to aim it right at the heart of the industry and our industry
            is made up of you – the local tradesperson. We don't want you
            working for us, we want to work for you.`}
          </p>
        </Accordion>

        <Accordion title="How does TPD benefit?">
          <p>
            {`We want to provide the best experience for both the customer and the
            fitter. Having a network of trusted tradespeople, like yourself,
            helps us ensure our customers' renovations go smoothly. Meaning
            everyone's a winner.`}
          </p>
        </Accordion>

        <Accordion title="Does this count as employment?">
          <p>
            {`We want to provide you with all the support, products and finance
            you need to expand your business and empire. Not tie you down with
            restrictive employment contracts. As a member of the`}
          </p>
        </Accordion>

        <Accordion title="Can I stop my membership at any time?">
          <p>
            {`Yes, we'll never tie you down with subscription costs or fees.
            Should you ever find yourself wanting to move on from our network,
            leaving is straightforward. We'll always be happy to welcome you
            back at a later date.`}
          </p>
        </Accordion>

        <Accordion title="What skills do I need to join?">
          <p>
            {`Good communication, a strong work ethic, good morals, and honesty.
            We also require proof of any accreditations you hold along with
            photographs of your work so we can showcase your skills. We want to
            ensure we have vetted all tradespeople properly so we can build
            trust with our customers.`}
          </p>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
