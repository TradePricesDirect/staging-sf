import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useCheckout } from "@saleor/sdk";
import { loadStripe } from "@stripe/stripe-js";
import paths from "core/paths";

export const useStripePaymentGateway = ({ id, config }) => {
  const { push } = useRouter();
  const { createPayment, completeCheckout } = useCheckout();

  const [clientSecret, setClientSecret] = useState(null);

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  // Load Stripe
  const stripePromise = useMemo(
    () => (apiKey ? loadStripe(apiKey) : null),
    [apiKey]
  );

  useEffect(() => {
    let isCancelled = false;

    // Create PaymentIntent, and clientSecret
    const createPaymentIntent = async () => {
      // Re-create payment, as Stripe client_secret seems to be attached here
      const { dataError: createError } = await createPayment({ gateway: id });

      if (createError?.error) {
        if (!isCancelled) push(paths.checkoutPayment);
        return;
      }

      // First complete checkout creates the client secret
      const { data } = await completeCheckout({
        storeSource: true,
        paymentData: {
          payment_method_types: ["card", "klarna"],
        },
      });

      const { client_secret } = JSON.parse(data.confirmationData);

      if (!client_secret) {
        if (!isCancelled) push(paths.checkoutPayment);
        return;
      }

      if (!isCancelled) setClientSecret(client_secret);
    };

    if (stripePromise) createPaymentIntent();

    return () => {
      isCancelled = true;
    };
  }, [stripePromise]);

  return { clientSecret, stripePromise };
};

export const STRIPE_APPEARANCE = {
  theme: "stripe",
  variables: {
    colorPrimary: "#03284c",
    colorBackground: "#ffffff",
    colorText: "#222321",
    colorDanger: "#ef4444",
    fontFamily: "mazzard, sans-serif",
  },
};
