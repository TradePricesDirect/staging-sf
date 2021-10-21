import { useState } from "react";
import { useCheckout } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCreditCard,
  faTruck,
} from "@fortawesome/pro-regular-svg-icons";
import { paymentGatewayNames } from "core/constants";
import Alert from "components/atoms/Alert";
import Money from "components/atoms/Money";
import SubmitButton from "components/atoms/SubmitButton";
import AddressTileInfo from "components/molecules/AddressTileInfo";

import styles from "./CheckoutReview.module.scss";
import { useOrderAddNoteMutation } from "graphql/mutations";

export const CheckoutReview = ({ onSubmitSuccess }) => {
  const { checkout, payment, completeCheckout } = useCheckout();
  const [orderAddNote] = useOrderAddNoteMutation();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const paymentMethod = getPaymentMethodDescription(payment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    // Stripe
    if (payment.gateway === paymentGatewayNames.stripe) {
      console.log("COMPLETE STRIPE");
    }
    // Finance (Dummy)
    else if (payment.gateway === paymentGatewayNames.dummy) {
      const { data, dataError } = await completeCheckout();

      if (dataError?.error) {
        setLoading(false);
        setErrors(dataError.error);
      } else {
        await orderAddNote({
          variables: {
            id: data.order.id,
            message: "Pay By Finance Requested",
          },
        });

        onSubmitSuccess(data.order.token);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.title}>Review Order</h2>

      {errors?.map((error) => (
        <Alert type="danger">{error.message}</Alert>
      ))}

      <div className="row gy-4">
        <div className="col-12 col-sm-6">
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon icon={faAddressBook} fixedWidth className="me-1" />
            Delivery Address
          </h3>
          <AddressTileInfo address={checkout.shippingAddress} />
        </div>
        <div className="col-12 col-sm-6">
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon icon={faAddressBook} fixedWidth className="me-1" />
            Billing Address
          </h3>
          <AddressTileInfo address={checkout.billingAddress} />
        </div>

        <div className="col-12 col-sm-6">
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon icon={faTruck} fixedWidth className="me-1" />
            Shipping Method
          </h3>

          <p>
            {checkout.shippingMethod.name}:{" "}
            <Money money={checkout.shippingMethod.price} />
          </p>
        </div>
        <div className="col-12 col-sm-6">
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon icon={faCreditCard} fixedWidth className="me-1" />
            Payment Method
          </h3>

          <p>{paymentMethod}</p>
        </div>
      </div>

      <SubmitButton loading={loading}>Place Order</SubmitButton>
    </form>
  );
};

const getPaymentMethodDescription = (payment) => {
  if (payment?.gateway === paymentGatewayNames.dummy) {
    return "Pay by Finance";
  }
  if (payment?.creditCard) {
    return `Ending in ${payment?.creditCard.lastDigits}`;
  }
  return "";
};
