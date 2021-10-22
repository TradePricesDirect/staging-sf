import { Elements } from "@stripe/react-stripe-js";
import Loader from "components/atoms/Loader";
import StripeCreditCardForm from "components/organisms/StripeCreditCardForm";
import { STRIPE_APPEARANCE, useStripePaymentGateway } from "./utils";

import styles from "./StripePaymentGateway.module.scss";

const StripePaymentGateway = ({ id, config, onSubmitPaymentSuccess }) => {
  const { clientSecret, stripePromise } = useStripePaymentGateway({
    id,
    config,
  });

  return (
    <>
      <h3 className={styles.title}>Credit/Debit Card</h3>

      {clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
        >
          <StripeCreditCardForm
            onSubmitPaymentSuccess={onSubmitPaymentSuccess}
          />
        </Elements>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default StripePaymentGateway;
