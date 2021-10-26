export const formatDate = (value) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GB").format(date);
};

export const formatDateTime = (value) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
};
