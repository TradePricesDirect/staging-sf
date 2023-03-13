const getFeaturedCategories = (categories, featuredCategories) => {
  // backwards way of filtering to preserve the original array order (could probably be improved)
  return featuredCategories
    ?.map((slug) => categories.filter((category) => category.slug === slug)[0])
    .filter((index) => index);
};

export default getFeaturedCategories;
