import _ from "lodash";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";
import Widget from "components/molecules/Widget";

import styles from "./WidgetActiveFilters.module.scss";

const WidgetActiveFilters = ({ attributes, filters, onRemove }) => {
  const selected = getSelectedFilters(filters.attributes, attributes);

  return (
    <Widget title="Active Filters" isOpen>
      <ul className={styles.list}>
        {selected.map((attr) => {
          return attr.values.map((value, index) => (
            <li key={`active-filter-${attr.slug}-${index}`}>
              <button
                type="button"
                onClick={() => onRemove(attr.slug, value.slug)}
                className={clsx(
                  "btn btn-sm btn-outline-primary",
                  styles.button
                )}
              >
                {attr.name}: {value.name}
                <FontAwesomeIcon icon={faTimes} className="ms-2" />
              </button>
            </li>
          ));
        })}
      </ul>
    </Widget>
  );
};

export default WidgetActiveFilters;

const getSelectedFilters = (filters, attributes) => {
  return Object.entries(filters).map(([key, values]) => {
    const attr = attributes.find(({ slug }) => slug === key);

    return {
      name: attr.name,
      slug: attr.slug,
      values: values.map((value) => {
        return attr.choices.edges.find(({ node }) => node.slug === value).node;
      }),
    };
  });
};
