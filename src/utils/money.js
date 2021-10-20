export const isPriceEqual = (first, second) => {
  return first.amount === second.amount && first.currency === second.currency;
};
