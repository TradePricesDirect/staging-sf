import { useState } from "react";

import { useCheckout } from "@saleor/sdk";
import { useOrderAddNoteMutation } from "graphql/mutations";
import { CheckoutStepEnum } from "views/Checkout/utils";
import Button from "components/atoms/Button";
import CheckoutErrors from "components/organisms/CheckoutErrors";

import styles from "./FinancePaymentGateway.module.scss";
import { icons } from "core/constants";

const FinancePaymentGateway = ({ onSubmitSuccess }) => {
  const { completeCheckout } = useCheckout();
  const [orderAddNote] = useOrderAddNoteMutation();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

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

      onSubmitSuccess(CheckoutStepEnum.Review, data?.order);
    }
  };

  return (
    <>
      <CheckoutErrors errors={errors} />

      <h3 className={styles.title}>Pay By Finance</h3>

      <form onSubmit={handleSubmit}>
        <p>
          Once you have placed your order on the website, a member of staff will
          be in touch within 24 hours to go through finance options with you.
        </p>

        <div className="row">
          <div className="col-auto">
            <Button path="/checkout/payment" label="Back" />
          </div>

          <div className="col-auto">
            <Button submit label="Place Order" color="secondary" icon={icons.faArrowRight} loading={loading} />
          </div>
        </div>
      </form>
    </>
  );
};

export default FinancePaymentGateway;
