import { useMemo } from "react";
import sortBy from "lodash/sortBy";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTimes } from "@fortawesome/pro-light-svg-icons";
import useDisclosure from "hooks/useDisclosure";
import Drawer from "components/organisms/Drawer";
import AddToCartSection from "components/organisms/AddToCartSection";
import CallToAction from "./CallToAction";

import styles from "./ProductAdditionalInformation.module.scss";

const ProductAdditionalInformation = ({
  product,
  variant,
  attributes,
  metadata,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const list = useMemo(
    () => combineDataLists(attributes, metadata),
    [attributes, metadata]
  );

  return (
    <>
      <button onClick={onOpen} className={styles.button}>
        Additional Information
        <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
      </button>

      <Drawer isOpen={isOpen} onClose={onClose} position="right">
        <section className={styles.wrap}>
          <div className={styles.close}>
            <button
              type="button"
              className="btn btn-sm"
              aria-label="Close"
              title="Close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span className="visually-hidden">Close</span>
            </button>
          </div>

          <header className={styles.header}>
            <h4 className={styles.subTitle}>{product.name}</h4>
            <h3 className={styles.title}>Additional Information</h3>
          </header>

          <div className={styles.body}>
            <table className={styles.table}>
              <tbody>
                {list.map(({ key, value }) => (
                  <tr key={uuid()}>
                    <th className={styles.th}>{key}</th>
                    <td className={styles.td}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className={styles.footer}>
            <AddToCartSection
              variant={variant}
              isAvailableForPurchase={product.isAvailableForPurchase}
              availableForPurchase={product.availableForPurchase}
              onAdd={onClose}
            />

            <CallToAction />
          </footer>
        </section>
      </Drawer>
    </>
  );
};

export default ProductAdditionalInformation;

const combineDataLists = (attributes, metadata) => {
  const list = [
    ...metadata,
    ...attributes.map(({ attribute, values }) => ({
      key: attribute.name,
      value: values.map((value) => value.name).join(", "),
    })),
  ];

  return sortBy(list, ["key"]);
};
