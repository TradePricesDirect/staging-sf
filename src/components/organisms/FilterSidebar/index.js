import WidgetCategory from "components/molecules/WidgetCategory";
import WidgetAttributes from "components/molecules/WidgetAttributes";

import styles from "./FilterSidebar.module.scss";

const FilterSidebar = ({
  categories = [],
  attributes,
  filters,
  onAttributeFiltersChange,
}) => {
  return (
    <div className={styles.wrap} role="complementary">
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
