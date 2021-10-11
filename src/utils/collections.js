export const SORT_OPTIONS = [
  { label: "Clear", value: null },
  { label: "Price Low-High", value: "price" },
  { label: "Price High-Low", value: "-price" },
  { label: "Name A-Z", value: "name" },
  { label: "Name Z-A", value: "-name" },
];

export const PER_PAGE_OPTIONS = [
  { label: "20 per page", value: 20 },
  { label: "50 per page", value: 50 },
  { label: "100 per page", value: 100 },
];

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];

    Object.keys(valueObj).forEach((value) => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });

    return str.join(".");
  },

  decode(strValue = "") {
    const obj = {};
    const propsWithValues = strValue.split(".").filter((n) => n);

    propsWithValues.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });

    return obj;
  },
};
