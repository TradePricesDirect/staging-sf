import clsx from "clsx";
import Accordion from "components/molecules/Accordion";

import styles from "./FAQs.module.scss";

const FAQs = () => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        <h2 className={styles.title}>Confused? Check out our FAQs</h2>

        <Accordion title="How do I make monthly Payments?" open>
          <p>
            {`You'll never have to worry about missing a payment as the team at
            Propensio Finance Limited will help you arrange pre-authorised
            payments via your bank account or debit card.`}
          </p>
        </Accordion>

        <Accordion title="Are there any limits on how much I can spend?">
          <p>
            {`Yes, payment plans are available on purchases between £1,000 to
            £25,000 from Propensio Finance Limited. With 6-month deferred
            interest free and up to 3-years 0% financing available.`}
          </p>

          <p>
            {`Klarna Bank AB (publ) offers payment plans on purchases on orders up
            to £1,000.00 and are not regulated by the FCA.`}
          </p>
        </Accordion>

        <Accordion title="Can I request delivery to an address other than my home address?">
          <p>
            {`In adherence with FCA guidelines designed to protect against
            fraudulent applications, we only deliver goods to your home address.`}
          </p>
        </Accordion>

        <Accordion title="What happens to my loan if I want to return my order?">
          <p>
            {`In the unlikely event you're not satisfied with your purchase, you
            can return it within 7 days from delivery. We will notify the lender
            to reduce your loan amount accordingly. Once we have received the
            goods you will receive a notification from our lender confirming the
            cancellation of your application.`}
          </p>
        </Accordion>

        <Accordion title="Who am I borrowing from?">
          <p>Our lenders are:</p>

          <p>
            <strong>Propensio Finance Limited</strong> (for purchases £1,000.00
            - £25,000.00)
          </p>

          <p>Authorised and regulated by the Financial Conduct Authority.</p>

          <p className="m-0">
            <strong>Business registered address:</strong>
          </p>

          <address>
            39-43 Bridge Street, <br />
            Swinton, <br />
            Mexborough, <br />
            South Yorkshire, <br />
            S64 8AP
          </address>

          <p>FCA register No. 806409</p>

          <hr />

          <p>
            <strong>Klarna Bank AB (publ)</strong> (for purchases up to
            £1,000.00)
          </p>

          <p className="m-0">
            <strong>Business registered address:</strong>
          </p>

          <address>
            Sveavägen 46, <br />
            111 34 Stockholm, <br />
            Sweden.
          </address>

          <p>Organisation No: 556737-0431.</p>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
