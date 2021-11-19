import { useState } from "react";
import Link from "next/link";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import paths from "core/paths";
import SubmitButton from "components/atoms/SubmitButton";
import CheckoutErrors from "../CheckoutErrors";

const StripeCreditCardForm = ({ onSubmitPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || loading) return;

    setLoading(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}${paths.checkoutPaymentConfirm}`,
      },
    });

    if (error) {
      setErrors([error]);
      setLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        onSubmitPaymentSuccess();
      } else {
        const error = {
          code: "STRIPE_ERROR",
          message: "Your payment was not successful.",
        };

        setErrors([error]);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <PaymentElement className="mb-4" />

        <div className="row">
          <div className="col-auto">
            <Link href="/checkout/payment">
              <a className="btn btn-outline-primary">Back</a>
            </Link>
          </div>

          <div className="col-auto">
            <SubmitButton loading={loading}>Place Order</SubmitButton>
          </div>
        </div>
      </form>

      <CheckoutErrors errors={errors} />
    </>
  );
};

export default StripeCreditCardForm;
