import { useEffect, useState } from "react";
import { useAuth, useCheckout } from "@saleor/sdk";
import useDisclosure from "hooks/useDisclosure";
import SubmitButton from "components/atoms/SubmitButton";
import AddAddressButton from "components/molecules/AddAddressButton";
import AddressFormModal from "components/organisms/AddressFormModal";
import CheckoutErrors from "components/organisms/CheckoutErrors";
import AddressOption from "./AddressOption";

import styles from "./CheckoutAddress.module.scss";

export const CheckoutAddress = ({ onSubmitSuccess }) => {
  const { user } = useAuth();

  const {
    selectedShippingAddressId,
    selectedBillingAddressId,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
  } = useCheckout();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [state, setState] = useState({
    shipping: null,
    billing: null,
    billingAsShipping: true,
  });

  useEffect(() => {
    const newState = {};

    if (selectedShippingAddressId) {
      newState.shipping = user.addresses.find(
        ({ id }) => id === selectedShippingAddressId
      );
    }

    if (selectedBillingAddressId) {
      newState.billing = user.addresses.find(
        ({ id }) => id === selectedBillingAddressId
      );
    }

    setState({ ...state, ...newState });
  }, [selectedShippingAddressId, selectedBillingAddressId]);

  const handleShippingChange = (address) => {
    if (!loading) setState({ ...state, shipping: address });
  };

  const handleBillingChange = (address) => {
    if (!loading) setState({ ...state, billing: address });
  };

  const handleBillingAsShippingChange = () => {
    if (!loading) {
      setState((prevState) => ({
        ...prevState,
        billing: null,
        billingAsShipping: !prevState.billingAsShipping,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shipping, billingAsShipping, billing } = state;

    if (loading) return;

    // Loading
    setLoading(true);

    // Set Shipping Address
    const { dataError: shippingError } = await setShippingAddress(
      shipping,
      user.email
    );

    if (shippingError?.error) {
      setErrors(shippingError.error);
      setLoading(false);
      return;
    }

    // Set Billing Address
    if (billingAsShipping) {
      const { dataError } = await setBillingAsShippingAddress();

      if (dataError?.error) {
        setErrors(dataError.error);
        setLoading(false);
        return;
      }
    } else {
      const { dataError } = await setBillingAddress(billing, user.email);

      if (dataError?.error) {
        setErrors(dataError.error);
        setLoading(false);
        return;
      }
    }

    onSubmitSuccess();
  };

  const canSubmit =
    (state.shipping && state.billingAsShipping) ||
    (state.shipping && state.billing);

  return (
    <>
      <CheckoutErrors errors={errors} />

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className={styles.title}>Delivery Address</legend>
          <p className={styles.lead}>Add or select an address to continue</p>

          <div className={styles.grid}>
            {user.addresses.map((address) => (
              <AddressOption
                key={`delivery-${address.id}`}
                address={address}
                onClick={() => handleShippingChange(address)}
                selected={state.shipping?.id === address.id}
              />
            ))}

            <AddAddressButton onClick={onOpen} />
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className={styles.title}>Billing Address</legend>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="billingAsShipping"
              id="billingAsShipping"
              checked={state.billingAsShipping}
              onChange={handleBillingAsShippingChange}
            />
            <label className="form-check-label" htmlFor="billingAsShipping">
              Same as delivery address
            </label>
          </div>

          {!state.billingAsShipping && (
            <div className={styles.grid}>
              {user.addresses.map((address) => (
                <AddressOption
                  key={`billing-${address.id}`}
                  address={address}
                  onClick={() => handleBillingChange(address)}
                  selected={state.billing?.id === address.id}
                />
              ))}

              <AddAddressButton onClick={onOpen} />
            </div>
          )}
        </fieldset>

        {canSubmit && <SubmitButton loading={loading}>Continue</SubmitButton>}
      </form>

      <AddressFormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
