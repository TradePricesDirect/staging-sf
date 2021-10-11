export const filtersChangeHandler = (
  filters,
  attributeFilters,
  setAttributeFilters
) => {
  return (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[name].length === 1) {
          const att = { ...attributeFilters };
          delete att[name];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [name]: attributeFilters[name].filter((item) => item !== value),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [name]: [...attributeFilters[name], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [name]: [value] });
    }
  };
};

export const getActiveFilterAttributes = (filterAttributes, attributes) => {
  const getAttribute = (attributeSlug, valueSlug) => {
    const valueName = attributes
      ?.find(({ slug }) => attributeSlug === slug)
      .choices.edges?.map(({ node }) => node)
      .find(({ slug }) => valueSlug === slug).name;

    return valueName
      ? {
          attributeSlug,
          valueName,
          valueSlug,
        }
      : undefined;
  };

  return (
    filterAttributes &&
    Object.keys(filterAttributes)
      .reduce(
        (acc, key) =>
          acc.concat(
            filterAttributes[key].map((valueSlug) =>
              getAttribute(key, valueSlug)
            )
          ),
        []
      )
      .filter(Boolean)
  );
};
