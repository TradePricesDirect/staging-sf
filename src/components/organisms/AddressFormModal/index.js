import { useEffect } from "react";
import { useCreateUserAddress, useUpdateUserAddress } from "@saleor/sdk";
import Modal from "components/organisms/Modal";
import AddressForm from "components/molecules/AddressForm";

const AddressFormModal = ({ address, isOpen, onClose }) => {
  let errors = null;

  const title = address ? "Edit Address" : "Add New Address";

  const [
    setCreateUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  const [
    setUpdateUserAddress,
    { data: updateData, error: addressUpdateErrors },
  ] = useUpdateUserAddress();

  useEffect(() => {
    if (
      (createData && !addressCreateErrors) ||
      (updateData && !addressUpdateErrors)
    ) {
      onClose();
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  const onSubmit = async (data) => {
    if (address?.id) {
      await setUpdateUserAddress({
        id: address.id,
        input: data,
      });
    } else {
      await setCreateUserAddress({ input: data });
    }
  };

  if (addressCreateErrors) {
    errors = addressCreateErrors.extraInfo.userInputErrors;
  }

  if (addressUpdateErrors) {
    errors = addressUpdateErrors.extraInfo.userInputErrors;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <AddressForm address={address} errors={errors} onSubmit={onSubmit} />
    </Modal>
  );
};

export default AddressFormModal;
