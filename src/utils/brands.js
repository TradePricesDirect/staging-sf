import config from "core/brands";

export const filterBrandsByCategory = (list, key) => {
  if (!config.hasOwnProperty(key)) return list;

  const brands = config[key];

  return list.filter(({ slug }) => brands.includes(slug));
};
