import { useDeleteUserAddresss } from "@saleor/sdk";
import AddressTile from "components/molecules/AddressTile";

import styles from "./AddressBook.module.scss";

const AddressBook = ({ addresses, onEdit }) => {
  const [setDeleteUserAddress] = useDeleteUserAddresss();

  if (!addresses.length) {
    return <p>You have no saved addresses yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {addresses.map((address) => (
        <li key={address.id}>
          <AddressTile
            address={address}
            onEdit={() => onEdit(address)}
            onRemove={() => setDeleteUserAddress({ addressId: address.id })}
          />
        </li>
      ))}
    </ul>
  );
};

export default AddressBook;
