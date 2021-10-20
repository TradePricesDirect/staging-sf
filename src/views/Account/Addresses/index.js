import { useState } from "react";
import { useAuth } from "@saleor/sdk";
import useDisclosure from "hooks/useDisclosure";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import AddressBook from "components/organisms/AddressBook";
import AddressFormModal from "components/organisms/AddressFormModal";

const AccountAddresses = () => {
  const { user } = useAuth();

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
      <h2 className="mb-4">Your Addresses</h2>

      <p>
        For a faster checkout, securely store shipping and billing addresses for
        your account.
      </p>

      <AddressBook addresses={user.addresses} onEdit={onEdit} />

      <button type="button" onClick={onOpen} className="btn btn-primary">
        Add new Address
      </button>

      <AddressFormModal
        isOpen={isOpen}
        onClose={onModalClose}
        address={addressData}
      />
    </Account>
  );
};

export default withAuth(AccountAddresses);
