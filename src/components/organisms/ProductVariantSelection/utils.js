import { useEffect, useState } from "react";
import { unionBy } from "lodash";

export const useProductVariantSelection = ({
  variants,
  variant,
  setVariantId,
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState(
    getVariantSelectedAttributes(variant)
  );

  const attributes = groupByAttributes(variants, selectedAttributes);

  useEffect(() => {
    const allSelected =
      Object.keys(attributes).length === Object.keys(selectedAttributes).length;

    if (allSelected) {
      const [variant] = getVariantsByAttributes(variants, selectedAttributes);

      if (variant) {
        setVariantId(variant.id);
        return;
      }
    }

    setVariantId(null);
  }, [selectedAttributes]);

  const onAttributeChange = (attributeId, valueId, override = false) => {
    if (override) {
      setSelectedAttributes({ [attributeId]: valueId });
    } else {
      setSelectedAttributes({
        ...selectedAttributes,
        [attributeId]: valueId,
      });
    }
  };

  return { attributes, onAttributeChange };
};

const groupByAttributes = (variants, selectedAttributes) => {
  // Loop all variants...
  return variants.reduce((attributes, variant) => {
    // Grab first image as variant thumbnail
    const thumbnail = variant.images.length ? variant.images[0] : null;

    // Loop their attributes...
    return variant.attributes.reduce((acc, curr) => {
      // Check if attribute object exists
      const index = acc.findIndex((a) => a.id === curr.attribute.id);

      // Format attribute values with extra info
      const values = curr.values.map((value) => ({
        ...value,
        thumbnail: curr.attribute.slug === "colour" ? thumbnail : null,
        selected: selectedAttributes?.[curr.attribute.id] === value.id,
        // Work out how many variants are available if this attribute was selected
        variants: getVariantsByAttributes(variants, {
          ...selectedAttributes,
          [curr.attribute.id]: value.id,
        }),
      }));

      if (index < 0) return [...acc, { ...curr.attribute, values }];

      acc[index].values = unionBy(acc[index].values, values, "id");
      return acc;
    }, attributes);
  }, []);
};

/**
 * Get a subset of variants based upon selected attributes
 * @param {array} variants Product Variants
 * @param {object} attributes attributeId: valueId pairings
 * @returns
 */
const getVariantsByAttributes = (variants, attributes) => {
  const attributeIds = Object.keys(attributes);

  return variants.filter((variant) => {
    const matches = variant.attributes.filter(({ attribute, values }) => {
      if (attributeIds.includes(attribute.id)) {
        return !!values.find(({ id }) => id === attributes[attribute.id]);
      }

      return false;
    });

    return matches.length === attributeIds.length;
  });
};

const getVariantSelectedAttributes = (variant) => {
  const attributes = {};

  if (!variant) return attributes;

  variant.attributes.forEach(({ attribute, values }) => {
    attributes[attribute.id] = values[0].id;
  });

  return attributes;
};
