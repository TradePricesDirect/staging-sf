export const isPriceEqual = (first, second) => {
  return first.amount === second.amount && first.currency === second.currency;
};

export const formatMoney = ({ amount, currency }, options) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
    ...options,
  }).format(amount);
};
