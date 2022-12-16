const formatSlug = (slug: string) =>
  slug
    .replaceAll("-", " ")
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
    .replace("And", "&");

export default formatSlug;
