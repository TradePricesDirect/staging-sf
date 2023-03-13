import { useMemo } from "react";
import { useCheckout } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
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
import CheckoutErrors from "components/organisms/CheckoutErrors";

export const CheckoutReview = ({
  onSubmitSuccess,
  onSubmitPaymentSuccess,
  errors,
}) => {
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
              icon={icons.faAddressBook}
              fixedWidth
              size="sm"
              className="me-2 text-secondary"
            />
            Delivery Address
          </h3>
          <div className="p-3">
            <FormattedAddress className="p-3" address={checkout.shippingAddress} />
          </div>
        </Box>

        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={icons.faAddressBook}
              fixedWidth
              size="sm"
              className="me-2 text-secondary"
            />
            Billing Address
          </h3>
          <div className="p-3">
            <FormattedAddress address={checkout.billingAddress} />
          </div>
        </Box>

        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={icons.faTruck}
              fixedWidth
              size="sm"
              className="me-2 text-secondary"
            />
            Delivery Method
          </h3>
          <p className="m-0 p-3">
            {checkout.shippingMethod.name}:{" "}
            <Money money={checkout.shippingMethod.price} />
          </p>
        </Box>

        <Box>
          <h3 className={styles.subtitle}>
            <FontAwesomeIcon
              icon={icons.faCreditCard}
              fixedWidth
              size="sm"
              className="me-2 text-secondary"
            />
            Payment Method
          </h3>

          <p className="m-0 p-3">{paymentGateway?.label}</p>
        </Box>
      </div>

      <CheckoutErrors errors={errors} />
      {PaymentGateway}
    </>
  );
};
