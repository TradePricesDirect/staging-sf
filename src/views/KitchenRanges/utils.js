export const filtersChangeHandler = (filters, setFilters) => {
  return (name, value) => {
    if (filters && filters.hasOwnProperty(name)) {
      if (filters[name].includes(value)) {
        if (filters[name].length === 1) {
          const att = { ...filters };
          delete att[name];
          setFilters({ ...att });
        } else {
          setFilters({
            ...filters,
            [name]: filters[name].filter((item) => item !== value),
          });
        }
      } else {
        setFilters({ ...filters, [name]: [...filters[name], value] });
      }
    } else {
      setFilters({ ...filters, [name]: [value] });
    }
  };
};
