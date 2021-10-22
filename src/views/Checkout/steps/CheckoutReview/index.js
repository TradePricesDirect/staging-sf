import { useMemo } from "react";
import { useCheckout } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCreditCard,
  faTruck,
} from "@fortawesome/pro-regular-svg-icons";
import { FormattedAddress } from "utils/address";
import {
  getPaymentGatewayInfo,
  getStripeConfig,
  PaymentGatewayEnum,
} from "views/Checkout/utils";
import Money from "components/atoms/Money";
import Box from "components/organisms/Box";
import FinancePaymentGateway from "components/organisms/FinancePaymentGateway";
import StripePaymentGateway from "components/organisms/StripePaymentGateway";

import styles from "./CheckoutReview.module.scss";

export const CheckoutReview = ({ onSubmitSuccess, onSubmitPaymentSuccess }) => {
  const { checkout, payment, availablePaymentGateways } = useCheckout();

  const paymentGateway = getPaymentGatewayInfo(payment?.gateway);

  const PaymentGateway = useMemo(() => {
    switch (payment?.gateway) {
      case PaymentGatewayEnum.Stripe:
        return (
          <StripePaymentGateway
            id={PaymentGatewayEnum.Stripe}
            config={getStripeConfig(availablePaymentGateways)}
            onSubmitPaymentSuccess={onSubmitPaymentSuccess}
          />
        );
      case PaymentGatewayEnum.Finance:
        return <FinancePaymentGateway onSubmitSuccess={onSubmitSuccess} />;
      default:
        return null;
    }
  }, [payment]);

  return (
    <>
      <h2 className={styles.title}>Review Order</h2>

      <div className={styles.grid}>
        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={faAddressBook}
              fixedWidth
              size="sm"
              className="me-2"
            />
            Delivery Address
          </h3>

          <FormattedAddress address={checkout.shippingAddress} />
        </Box>

        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={faAddressBook}
              fixedWidth
              size="sm"
              className="me-2"
            />
            Billing Address
          </h3>

          <FormattedAddress address={checkout.billingAddress} />
        </Box>

        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={faTruck}
              fixedWidth
              size="sm"
              className="me-2"
            />
            Delivery Method
          </h3>
          <p className="m-0">
            {checkout.shippingMethod.name}:{" "}
            <Money money={checkout.shippingMethod.price} />
          </p>
        </Box>

        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={faCreditCard}
              fixedWidth
              size="sm"
              className="me-2"
            />
            Payment Method
          </h3>

          <p className="m-0">{paymentGateway?.label}</p>
        </Box>
      </div>

      {PaymentGateway}
    </>
  );
};
