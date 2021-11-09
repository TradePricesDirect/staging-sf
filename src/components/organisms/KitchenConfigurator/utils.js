import _ from "lodash";
import { ColorsEnum } from "core/colors";

export const StepsEnum = {
  Color: "color",
  Units: "unit",
  Worktops: "worktop",
  Accessories: "accessory",
};

export const PAINT_TO_ORDER_OPTIONS = [
  { value: "Cashmere (081)", label: "Cashmere (081)" },
  { value: "Chalkstone (256)", label: "Chalkstone (256)" },
  { value: "Dakar (256)", label: "Dakar (256)" },
  { value: "Denim (256)", label: "Denim (256)" },
  { value: "Dust Grey (256)", label: "Dust Grey (256)" },
  { value: "Fjord (256)", label: "Fjord (256)" },
  { value: "French Grey (256)", label: "French Grey (256)" },
  { value: "Indigo (256)", label: "Indigo (256)" },
  { value: "Lava (256)", label: "Lava (256)" },
  { value: "Light Grey (256)", label: "Light Grey (256)" },
  { value: "Midnight Blue (256)", label: "Midnight Blue (256)" },
  { value: "Mussel (256)", label: "Mussel (256)" },
  { value: "Onyx Grey (256)", label: "Onyx Grey (256)" },
  { value: "Pebble Grey (256)", label: "Pebble Grey (256)" },
  { value: "Porcelain (256)", label: "Porcelain (256)" },
  { value: "Sage Green (256)", label: "Sage Green (256)" },
  { value: "Silver Grey (256)", label: "Silver Grey (256)" },
  { value: "Smoke Blue (256)", label: "Smoke Blue (256)" },
  { value: "Stone Grey (256)", label: "Stone Grey (256)" },
  { value: "Super White (256)", label: "Super White (256)" },
  { value: "Taupe Grey (256)", label: "Taupe Grey (256)" },
  { value: "White (256)", label: "White (256)" },
  { value: "White Grey (256)", label: "White Grey (256)" },
];

export const filterProductsByVariants = (products, { door, cabinet }) => {
  return products.reduce((acc, product) => {
    // Get variant for door/cabinet combo
    const variant = product.variants.find((variant) => {
      if (!variant.attributes.length) return variant;

      const doors = getAttributeValues(variant.attributes, "door-colour");
      const cabinets = getAttributeValues(variant.attributes, "cabinet-colour");

      return (
        _.find(doors, ["slug", door]) &&
        _.find(cabinets, ({ slug }) => slug === cabinet || slug === "all")
      );
    });

    if (!variant) return acc;

    return [
      ...acc,
      {
        id: product.id,
        name: product.name,
        step: getAttributeValues(product.attributes, "kitchen-range-step"),
        categories: getAttributeValues(
          product.attributes,
          "kitchen-range-category"
        ),
        subcategories: getAttributeValues(
          product.attributes,
          "kitchen-range-subcategory"
        ),
        variant: variant,
      },
    ];
  }, []);
};

export const filterCartByVariants = (items, { door, cabinet }) => {
  console.log(items);

  if (!items) return;

  return items.filter((item) => {
    const { attributes } = item.variant;

    const doors = getAttributeValues(attributes, "door-colour");
    const cabinets = getAttributeValues(attributes, "cabinet-colour");

    console.log(doors);
    console.log(cabinets);

    return true;
  });
};

export const groupCategories = (products) => {
  const categories = products.reduce((acc, curr) => {
    curr.categories.forEach((category) => {
      const index = acc.findIndex((p) => p.slug === category.slug);

      if (index > -1) {
        acc[index].subcategories = _.sortBy(
          _.uniqBy(
            [...acc[index].subcategories, ...curr.subcategories],
            "slug"
          ),
          ["name"]
        );
      } else {
        acc.push({
          ...category,
          subcategories: _.sortBy(curr.subcategories, ["name"]),
        });
      }
    });

    return acc;
  }, []);

  return _.sortBy(categories, ["name"]);
};

export const getColorBySlug = (slug) => {
  const color = _.findKey(ColorsEnum, { slug });
  return ColorsEnum[color];
};

const getAttributeValues = (attributes, slug) => {
  const attribute = attributes.find((a) => a.attribute.slug === slug);

  return attribute?.values || [];
};
