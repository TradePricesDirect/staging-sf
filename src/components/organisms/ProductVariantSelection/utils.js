import { useEffect, useState } from "react";
import { unionBy } from "lodash";

export const useProductVariantSelection = ({
  variants,
  variant,
  setVariantId,
}) => {
  const attributes = groupVariantAttributes(variants);

  const [selectedAttributes, setSelectedAttributes] = useState(
    Object.keys(attributes).reduce((acc, id) => ({ ...acc, [id]: null }), {})
  );

  useEffect(() => {
    const variantAttributes = variant.attributes.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.attribute.id]: curr.values.length ? curr.values[0].id : null,
      }),
      {}
    );

    setSelectedAttributes(variantAttributes);
  }, [variant]);

  const onAttributeChange = (attributeId, valueId) => {
    const variantAttributes = { ...selectedAttributes, [attributeId]: valueId };

    setSelectedAttributes(variantAttributes);

    // Check all attributes are set
    const emptyAttributes = Object.values(variantAttributes).filter(
      (v) => v === null
    );

    if (!emptyAttributes.length) {
      const variant = getSelectedVariantByAttributes(
        variants,
        variantAttributes
      );

      if (variant) setVariantId(variant.id);
    }
  };

  return { attributes, selectedAttributes, onAttributeChange };
};

/**
 * Group product variants by attribute and values.
 *
 * @param {array} variants Product Variants
 * @returns {object} Object of attributes and associated values
 */
const groupVariantAttributes = (variants) => {
  const variantsAttributes = {};

  variants.forEach((variant) => {
    const thumbnail = variant.images.length ? variant.images[0] : null;

    variant.attributes.forEach(({ attribute, values }) => {
      const { id, slug } = attribute;

      const exists = variantsAttributes.hasOwnProperty(id);

      if (exists) {
        variantsAttributes[id].values = unionBy(
          variantsAttributes[id].values,
          values.map((value) => ({
            ...value,
            thumbnail: slug === "colour" ? thumbnail : null,
          })),
          "id"
        );
      } else {
        variantsAttributes[id] = {
          attribute: attribute,
          values: values.map((value) => ({
            ...value,
            thumbnail: slug === "colour" ? thumbnail : null,
          })),
        };
      }
    });
  });

  return variantsAttributes;
};

const getSelectedVariantByAttributes = (variants, attributes) => {
  const attributeIds = Object.keys(attributes);

  return variants.find((variant) => {
    const matches = variant.attributes.filter(({ attribute, values }) => {
      if (attributeIds.includes(attribute.id)) {
        return !!values.find(({ id }) => id === attributes[attribute.id]);
      }

      return false;
    });

    return matches.length === attributeIds.length;
  });
};
