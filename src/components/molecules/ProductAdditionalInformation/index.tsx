import { useEffect, useMemo } from "react";
import sortBy from "lodash/sortBy";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import useDisclosure from "hooks/useDisclosure";
import Drawer from "components/organisms/Drawer";

import styles from "./ProductAdditionalInformation.module.scss";
import useKeyPress from "hooks/useKeyPress";

import _ from "lodash";

const ProductAdditionalInformation = ({ product, variant }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    if (escapePress) {
      onClose();
    }
  }, [escapePress, onClose]);

  const list = useMemo(
    () => combineDataLists(product, variant),
    [product, variant]
  );

  return (
    <>
      <button onClick={onOpen} className={styles.button}>
        Additional Information
        <FontAwesomeIcon icon={icons.faAngleRight} className={styles.icon} />
      </button>

      <Drawer isOpen={isOpen} onClose={onClose} position="right">
        <section>
          <header className={styles.header}>
            <h3>Additional Information</h3>
            <button
              type="button"
              aria-label="Close"
              title="Close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={icons.faTimes} />
              <span className="visually-hidden">Close</span>
            </button>
          </header>

          <div className={styles.body}>
            <table className={styles.table}>
              <tbody>
                {list.map(({ id, key, values }) => (
                  <tr key={id}>
                    <th className={styles.th}>{key}</th>
                    <td className={styles.td}>
                      {values.map((value, index) => {
                        const fileUrl = value?.file?.url;

                        if (fileUrl) {
                          return (
                            <a
                              key={value.id}
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              download
                            >
                              {value.name}
                            </a>
                          );
                        }

                        return (
                          <span key={value.id}>
                            {index > 0 && ", "}
                            {value.name}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <footer className={styles.footer}>
            {variant && (
              <div className={styles.addToCart}>
                <AddToCartSection
                  product={product}
                  variant={variant}
                  isAvailableForPurchase={product.isAvailableForPurchase}
                  availableForPurchase={product.availableForPurchase}
                  onAdd={onClose}
                />
              </div>
            )}

            <GetHelpCallToAction />
          </footer> */}
        </section>
      </Drawer>
    </>
  );
};

export default ProductAdditionalInformation;

const combineDataLists = (product, variant) => {
  let attributes = product?.attributes || [];
  if (variant?.attributes) attributes = [...attributes, ...variant.attributes];

  let metadata = product?.metadata || [];
  if (variant?.metadata) metadata = [...metadata, ...variant.metadata];

  let list = [
    ...metadata.map(({ key, value }) => ({
      id: uuid(),
      key,
      values: [{ id: uuid(), name: value }],
    })),
    ...attributes.map(({ attribute, values }) => ({
      id: attribute.id,
      key: attribute.name,
      values: values.filter((value) => value.name !== "" && value),
    })),
  ];

  // Strip empty attributes
  list = _.filter(list, ({ values }) => values.length > 0);

  return sortBy(list, ["key"]);
};
