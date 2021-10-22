import { useState } from "react";
import { useAuth, useDeleteUserAddresss } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import useDisclosure from "hooks/useDisclosure";
import withAuth from "../withAuth";
import AddressTile from "components/molecules/AddressTile";
import Box from "components/organisms/Box";
import AddressFormModal from "components/organisms/AddressFormModal";
import Account from "components/templates/Account";

import styles from "./Addresses.module.scss";

const AccountAddresses = () => {
  const { user } = useAuth();
  const [setDeleteUserAddress] = useDeleteUserAddresss();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addressData, setAddressData] = useState(null);

  const onModalClose = () => {
    setAddressData(null);
    onClose();
  };

  const onEdit = (address) => {
    setAddressData(address);
    onOpen();
  };

  return (
    <Account>
      <h1 className={styles.title}>Your Addresses</h1>

      <p>
        For a faster checkout, securely store shipping and billing addresses for
        your account.
      </p>

      <div className={styles.grid}>
        {user.addresses.map((address) => (
          <AddressTile
            key={address.id}
            address={address}
            onEdit={() => onEdit(address)}
            onRemove={() => setDeleteUserAddress({ addressId: address.id })}
          />
        ))}

        <Box
          button
          type="button"
          onClick={onOpen}
          className={styles.addAddressButton}
        >
          <span className="btn">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Address
          </span>
        </Box>
      </div>

      <AddressFormModal
        isOpen={isOpen}
        onClose={onModalClose}
        address={addressData}
      />
    </Account>
  );
};

export default withAuth(AccountAddresses);
