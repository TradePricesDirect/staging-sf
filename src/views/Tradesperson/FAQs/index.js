import clsx from "clsx";
import Accordion from "components/molecules/Accordion";

import styles from "./FAQs.module.scss";

const FAQs = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h2 className={styles.title}>Not convinced? Check out our FAQs</h2>

        <Accordion title="Sounds too good to be true, what's the catch?" open>
          <p>
            There is no catch, we spent years developing our platform and wanted
            to aim it right at the heart of the industry and our industry is
            made up of you – the local tradesperson. We don't want you working
            for us, we want to work for you.
          </p>
        </Accordion>

        <Accordion title="How does TPD benefit?">
          <p>
            You'll get access to free leads, more building materials that you
            could ever need, along with tools, PPE etc. on next day delivery to
            your site address. Customers can also spread the cost with our
            flexible finance packages. There is a large list of reasons why you
            want to join the TPD revolution.
          </p>
        </Accordion>

        <Accordion title="Does this count as employment?">
          <p>
            No, we want to support you 'the local tradesperson' in growing your
            empire and will work in partnership with you, so we can
            revolutionise the industry together and make you, the 'local
            tradesperson' a customer's first choice over large retailers.
          </p>
        </Accordion>

        <Accordion title="Can I stop my membership at any time?">
          <p>
            We wouldn't want you to leave as we strive to keep our customers
            happy, but if you don't think it's right fit for you, we would
            always be happy to welcome you back at a later date.
          </p>
        </Accordion>

        <Accordion title="What skills do I need to join?">
          <p>
            Apart from good communication, a strong work ethic, good morals, and
            honesty. We would require proof of any accreditations you hold along
            with photographs of your work so we can showcase your skills. We
            want to ensure we have vetted all tradespeople properly so we can
            build trust with our customers.
          </p>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
