export const formatAddress = (address, join = "\n") => {
  if (!address) return null;

  const result = [
    address.companyName,
    address.streetAddress1,
    address.streetAddress2,
    address.city,
    address.postalCode,
    address.country.country,
  ].filter((item) => item);

  return result.join(join);
};
