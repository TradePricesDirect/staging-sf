import { useEffect, useMemo, useState } from "react";
import { useCheckout } from "@saleor/sdk";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "components/atoms/Loader";
import StripeCreditCardForm from "../StripeCreditCardForm";
import { parsePaymentConfirmationData, STRIPE_APPEARANCE } from "./utils";
import Alert from "components/atoms/Alert";

const StripePaymentGateway = ({ id, config, formRef }) => {
  const { createPayment, completeCheckout } = useCheckout();

  const [clientSecret, setClientSecret] = useState(null);
  const [errors, setErrors] = useState(null);

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  // Load Stripe
  const stripePromise = useMemo(() => {
    return apiKey ? loadStripe(apiKey) : null;
  }, [apiKey]);

  useEffect(() => {
    let isCancelled = false;

    async function createPaymentIntent() {
      try {
        // Create Payment
        const { dataError } = await createPayment({ gateway: id });

        if (dataError?.error) {
          if (!isCancelled) setErrors(dataError.error);
          throw new Error("Error during createPayment mutation");
        }

        // Create Stripe PaymentIntent
        const { data } = await completeCheckout();

        const { paymentAction } = parsePaymentConfirmationData(
          data.confirmationData
        );

        if (!isCancelled) setClientSecret(paymentAction.client_secret);
      } catch (error) {
        console.error(error);
      }
    }

    if (stripePromise) createPaymentIntent();

    return () => {
      isCancelled = true;
    };
  }, [stripePromise]);

  // useEffect(() => {

  // }, [formRef, stripePromise])

  const handleSubmit = () => {};

  if (errors) {
    return errors?.map((error) => <Alert type="danger">{error.message}</Alert>);
  }

  if (!clientSecret) return <Loader />;

  const options = { clientSecret, appearance: STRIPE_APPEARANCE };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCreditCardForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default StripePaymentGateway;
