import WidgetActiveFilters from "components/molecules/WidgetActiveFilters";
import WidgetCategory from "components/molecules/WidgetCategory";
import WidgetAttributes from "components/molecules/WidgetAttributes";

import styles from "./FilterSidebar.module.scss";

const FilterSidebar = ({
  categories = [],
  attributes,
  filters,
  activeFilters,
  onAttributeFiltersChange,
  parentCategory,
}) => {

  return (
    <div className={styles.wrap} role="complementary">
      {activeFilters > 0 && (
        <WidgetActiveFilters
          attributes={attributes}
          filters={filters}
          onRemove={onAttributeFiltersChange}
        />
      )}

      <WidgetCategory categories={categories} />


      {attributes.map(({ id, name, slug, choices }) => {
        const values = choices?.edges.map(({ node }) => node) || [];

        return (
          <WidgetAttributes
            key={id}
            title={name}
            name={slug}
            values={values.map((value) => ({
              ...value,
              selected: checkIfAttributeIsChecked(filters, value, slug),
            }))}
            onValueClick={(value) => onAttributeFiltersChange(slug, value.slug)}
            parentCategory={parentCategory}
          />
        );
      })}
    </div>
  );
};

export default FilterSidebar;

const checkIfAttributeIsChecked = (filters, value, slug) => {
  if (filters.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find((filter) => filter === value.slug)) {
      return true;
    }
    return false;
  }
  return false;
};
