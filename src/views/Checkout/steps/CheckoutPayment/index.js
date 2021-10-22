import { useState } from "react";
import { useCheckout } from "@saleor/sdk";
import { PROVIDERS } from "core/config";
import DummyPaymentGateway from "components/organisms/DummyPaymentGateway";
import StripePaymentGateway from "components/organisms/StripePaymentGateway";
import PaymentMethod from "./PaymentMethod";

import styles from "./CheckoutPayment.module.scss";

/*
TODO

This step will just have 2 big tiles to select either finance or stripe (credit card).
If the customer selected Stripe, we can load stripe+clientSecret on this step, then the reivew step a the bottom can render the form instantly and have the Place Order capture payment.
*/

export const CheckoutPayment = ({ onSubmitSuccess, paymentGatewayFormRef }) => {
  const { availablePaymentGateways, payment } = useCheckout();

  const [paymentGateway, setPaymentGateway] = useState(payment?.gateway);

  const paymentGateways = availablePaymentGateways || [];

  const handleChange = (id) => setPaymentGateway(id);

  return (
    <>
      <h2 className={styles.title}>Payment Method</h2>

      {paymentGateways.map(({ id, name, config }) => {
        const selected = paymentGateway === id;

        switch (id) {
          case PROVIDERS.DUMMY.id:
            return (
              <PaymentMethod
                key={id}
                name="Finance"
                onChange={() => handleChange(id)}
                selected={selected}
                gateway={
                  <DummyPaymentGateway
                    id={id}
                    onSubmitSuccess={onSubmitSuccess}
                  />
                }
              />
            );

          case PROVIDERS.STRIPE.id:
            return (
              <PaymentMethod
                key={id}
                name={name}
                onChange={() => handleChange(id)}
                selected={selected}
                gateway={
                  <StripePaymentGateway
                    id={id}
                    config={config}
                    formRef={paymentGatewayFormRef}
                  />
                }
              />
            );
        }
      })}
    </>
  );
};
