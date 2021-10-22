import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import paths from "core/paths";
import SubmitButton from "components/atoms/SubmitButton";

const StripeCreditCardForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setState({ ...state, loading: true });

    const res = await stripe.confirmCardPayment(clientSecret);

    console.log(res);

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   // redirect: "if_required",
    //   confirmParams: {
    //     return_url: `${window.location.origin}${paths.checkoutPaymentConfirm}`,
    //   },
    // });

    // if (error) {
    //   setState({ loading: false, error: error.message });
    // } else {
    //   console.log("NO REDIRECT");
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-4" />

      <SubmitButton loading={state.loading}>Submit</SubmitButton>

      {state.error && <p className="mt-4 text-danger">{state.error}</p>}
    </form>
  );
};

export default StripeCreditCardForm;
