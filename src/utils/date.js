export const formatDate = (value) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GB").format(date);
};
