export const formatNumber = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    style: "decimal",
  }).format(amount);
};
