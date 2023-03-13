import { Fragment } from "react";
import { useDefaultUserAddress } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import clsx from "clsx";
import useDisclosure from "hooks/useDisclosure";
import { formatAddress } from "utils/address";
import Box from "components/organisms/Box";
import Button from "components/atoms/Button";

import styles from "./AddressTile.module.scss";

const AddressTile = ({ address, onEdit, onRemove }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [setDefaultUserAddress] = useDefaultUserAddress();

  const addressString = formatAddress(address);

  const setDefault = async (type) => {
    await setDefaultUserAddress({ id: address.id, type });
    onClose();
  };

  return (
    <Box>
      <section className={styles.box}>
        <div className={styles.body}>
          <span>{`${address.firstName} ${address.lastName}`}</span>

          <address className={styles.address}>
            {addressString?.split("\n").map((item, key) => {
              return (
                <Fragment key={key}>
                  {item}
                  <br />
                </Fragment>
              );
            })}
          </address>
        </div>

        <footer className={styles.footer}>
          <Button
            submit
            color={"secondary"}
            label={`Edit Address`}
            icon={icons.faArrowRight}
            onClick={onEdit}
          />
          <button onClick={onRemove} className="btn btn-sm text-danger">
            <FontAwesomeIcon icon={icons.faTrash} fixedWidth />
          </button>
        </footer>
      </section>

      <button
        onClick={onToggle}
        type="button"
        className={clsx("btn btn-sm", styles.actionButton)}
      >
        <FontAwesomeIcon
          icon={isOpen ? icons.faTimes : icons.faEllipsisV}
          fixedWidth
        />
      </button>

      {isOpen && (
        <div className={styles.actionMenu}>
          <ul className={styles.menu}>
            <li>
              {address.isDefaultShippingAddress ? (
                <Button submit label={`Default Shipping Address`} />
              ) : (
                <Button
                  submit
                  label={`Set as Default Shipping Address`}
                  icon={icons.faArrowRight}
                  onClick={() => setDefault("SHIPPING")}
                />
              )}
            </li>
            <li>
              {address.isDefaultBillingAddress ? (
                <Button submit label={`Default Billing Address`} />
              ) : (
                <Button
                  submit
                  label={`Set as Default Billing Address`}
                  icon={icons.faArrowRight}
                  onClick={() => setDefault("BILLING")}
                />
              )}
            </li>
          </ul>
        </div>
      )}
    </Box>
  );
};

export default AddressTile;
