import { useEffect, useState } from "react";

import { useCheckout } from "@saleor/sdk";
import Button from "components/atoms/Button";
import CheckoutErrors from "components/organisms/CheckoutErrors";
import ShippingOption from "./ShippingOption";

import styles from "./CheckoutShipping.module.scss";
import { icons } from "core/constants";

export const CheckoutShipping = ({ onSubmitSuccess }) => {
  const { checkout, availableShippingMethods, setShippingMethod } =
    useCheckout();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [shippingMethodId, setShippingMethodId] = useState(
    checkout?.shippingMethod?.id
  );

  // Set default if only one available
  useEffect(() => {
    if (availableShippingMethods.length === 1 && !shippingMethodId) {
      setShippingMethodId(availableShippingMethods[0].id);
    }
  }, [availableShippingMethods]);

  const shippingMethods = availableShippingMethods || [];

  const handleChange = (id) => setShippingMethodId(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Loading
    setLoading(true);

    // Set Shipping Method
    const { dataError } = await setShippingMethod(shippingMethodId);

    if (dataError?.error) {
      setErrors(dataError.error);
      setLoading(false);
      return;
    }

    onSubmitSuccess();
  };

  const canSubmit = !!shippingMethodId;

  return (
    <>
      <CheckoutErrors errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className={styles.title}>Delivery Method</legend>

          <div className={styles.grid}>
            {shippingMethods.map((shippingMethod) => (
              <ShippingOption
                key={`shipping-${shippingMethod.id}`}
                shippingMethod={shippingMethod}
                onClick={() => handleChange(shippingMethod.id)}
                selected={shippingMethodId === shippingMethod.id}
              />
            ))}
          </div>
        </fieldset>

        <div className="row">
          <div className="col-auto">
            <Button path="/checkout/address" label='Back' />
          </div>

          {canSubmit && (
            <div className="col-auto">
              <Button submit label='Continue' color='secondary' icon={icons.faArrowRight} loading={loading} />
            </div>
          )}
        </div>
      </form>
    </>
  );
};
