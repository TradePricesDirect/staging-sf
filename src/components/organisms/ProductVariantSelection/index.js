import { unionBy } from "lodash";
import clsx from "clsx";
import Thumbnail from "components/molecules/Thumbnail";

import styles from "./ProductVariantSelection.module.scss";

const ProductVariantSelection = ({ variants, variantId, setVariantId }) => {
  const attributes = groupVariantAttributes(variants);

  return Object.values(attributes).map(({ attribute, values }) => {
    const selected = values.find((value) => value.variant.id === variantId);

    return (
      <div key={attribute.id} className={styles.wrap}>
        <h4 className={styles.label}>
          {attribute.name}: <span>{selected.name}</span>
        </h4>

        <ul className={styles.thumbs}>
          {values.map((value) => (
            <button
              key={value.id}
              className={clsx(
                styles.thumb,
                value.variant.id === variantId && styles.selected
              )}
              onClick={() => setVariantId(value.variant.id)}
            >
              <Thumbnail thumbnail={value.variant.images[0]} />
            </button>
          ))}
        </ul>
      </div>
    );
  });
};

export default ProductVariantSelection;

const groupVariantAttributes = (variants) => {
  const variantsAttributes = {};

  variants.forEach((variant) => {
    variant.attributes.forEach(({ attribute, values }) => {
      const id = attribute.id;
      const exists = variantsAttributes.hasOwnProperty(id);

      if (exists) {
        variantsAttributes[id].values = unionBy(
          variantsAttributes[id].values,
          values.map((value) => ({ ...value, variant })),
          "id"
        );
      } else {
        variantsAttributes[id] = {
          attribute: attribute,
          values: values.map((value) => ({ ...value, variant })),
        };
      }
    });
  });

  return variantsAttributes;
};
