import clsx from "clsx";
import { useProductVariantSelection } from "./utils";

import styles from "./ProductVariantSelection.module.scss";
import Image from "next/image";

const ProductVariantSelection = (props) => {
  const { attributes, onAttributeChange } = useProductVariantSelection(props);



  return (
    <div className={styles.wrap}>
      {attributes.map((attribute) => {
        const selected = attribute.values.find((value) => value.selected);

        return (
          <div key={attribute.id} className={styles.variant}>
            <h4 className={styles.label}>
              {attribute.name}{` : `}<span>{selected?.name}</span>
            </h4>

            <ul className={styles.values}>
              {attribute.values.map((value) => (
                <button
                  key={value.id}
                  className={clsx(
                    value.thumbnail ? styles.thumb : styles.button,
                    value.selected && styles.selected,
                    !value.variants.length && styles.disabled
                  )}
                  onClick={() =>
                    onAttributeChange(
                      attribute.id,
                      value.id,
                      !value.variants.length
                    )
                  }
                >
                  {value.thumbnail ? (
                    // <Thumbnail thumbnail={value.thumbnail} />
                    <div className={styles.image}>
                      <Image src={value.thumbnail.url} alt={value.thumbnail.alt} fill />
                    </div>
                  ) : (
                    <span>{value.name}</span>
                  )}
                </button>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariantSelection;
