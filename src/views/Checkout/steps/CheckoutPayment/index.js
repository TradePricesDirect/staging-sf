import { useState } from "react";
import { useCart, useCheckout } from "@saleor/sdk";
import {
  PaymentGatewayEnum,
  getAvailablePaymentGateways,
} from "views/Checkout/utils";
import SubmitButton from "components/atoms/SubmitButton";
import CheckoutErrors from "components/organisms/CheckoutErrors";
import PaymentOption from "./PaymentOption";

import styles from "./CheckoutPayment.module.scss";

export const CheckoutPayment = ({ onSubmitSuccess }) => {
  const { totalPrice } = useCart();

  const { availablePaymentGateways, payment, createPayment } = useCheckout();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [paymentGatewayId, setPaymentGatewayId] = useState(payment?.gateway);

  const paymentGateways = getAvailablePaymentGateways(
    availablePaymentGateways,
    totalPrice?.gross.amount
  );

  const handleChange = (id) => setPaymentGatewayId(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Loading
    setLoading(true);

    // Klarna is stripe
    const gateway =
      paymentGatewayId === PaymentGatewayEnum.Klarna
        ? PaymentGatewayEnum.Stripe
        : paymentGatewayId;

    const createPaymentInput = { gateway };

    // Finance order status
    if (gateway === PaymentGatewayEnum.Finance) {
      createPaymentInput.token = "not-charged";
    }

    const { dataError } = await createPayment(createPaymentInput);

    if (dataError?.error) {
      setErrors(dataError.error);
      setLoading(false);
      return;
    }

    onSubmitSuccess();
  };

  const canSubmit = !!paymentGatewayId;

  return (
    <>
      <CheckoutErrors errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className={styles.title}>Payment Method</legend>

          <p className={styles.lead}>Select a payment method to continue</p>

          <div className={styles.grid}>
            {paymentGateways.map((paymentGateway) => (
              <PaymentOption
                key={`gateway-${paymentGateway.id}`}
                paymentGateway={paymentGateway}
                onClick={() => handleChange(paymentGateway.id)}
                selected={paymentGatewayId === paymentGateway.id}
              />
            ))}
          </div>
        </fieldset>

        {canSubmit && <SubmitButton loading={loading}>Continue</SubmitButton>}
      </form>
    </>
  );
};
