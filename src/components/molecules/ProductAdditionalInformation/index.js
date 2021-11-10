import { useMemo } from "react";
import sortBy from "lodash/sortBy";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTimes } from "@fortawesome/pro-light-svg-icons";
import useDisclosure from "hooks/useDisclosure";
import Drawer from "components/organisms/Drawer";
import AddToCartSection from "components/organisms/AddToCartSection";
import GetHelpCallToAction from "components/molecules/GetHelpCallToAction";

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
                {list.map(({ id, key, values }) => (
                  <tr key={id}>
                    <th className={styles.th}>{key}</th>
                    <td className={styles.td}>
                      {values.map((value) => {
                        const fileUrl = value?.file?.url;

                        if (fileUrl) {
                          return (
                            <a
                              key={value.id}
                              href={fileUrl}
                              target="_blank"
                              download
                            >
                              {value.name}
                            </a>
                          );
                        }

                        return <span key={value.id}>{value.name}</span>;
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className={styles.footer}>
            {variant && (
              <AddToCartSection
                variant={variant}
                isAvailableForPurchase={product.isAvailableForPurchase}
                availableForPurchase={product.availableForPurchase}
                onAdd={onClose}
              />
            )}

            <GetHelpCallToAction />
          </footer>
        </section>
      </Drawer>
    </>
  );
};

export default ProductAdditionalInformation;

const combineDataLists = (attributes, metadata) => {
  const list = [
    ...metadata.map(({ key, value }) => ({
      id: uuid(),
      key,
      values: [{ name: value }],
    })),
    ...attributes.map(({ attribute, values }) => ({
      id: attribute.id,
      key: attribute.name,
      values: values,
    })),
  ];

  return sortBy(list, ["key"]);
};
