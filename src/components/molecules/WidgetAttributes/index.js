import clsx from "clsx";
import Widget from "components/molecules/Widget";
import _ from "lodash";
import { filterBrandsByCategory } from "utils/brands";

import styles from "./WidgetAttributes.module.scss";

const WidgetAttributes = ({
  title,
  name,
  values,
  onValueClick,
  parentCategory,
}) => {
  if (!values.length) return null;

  let list = _.sortBy(values, "name");

  if (name === "brand") {
    list = filterBrandsByCategory(list, parentCategory.slug);
  }

  if (!list.length) return null;

  return (
    <Widget title={title} isOpen>
      <ul className={styles.list}>
        {list.map((value) => (
          <li key={value.id}>
            <div className={clsx("form-check", styles.option)}>
              <input
                className="form-check-input"
                type="checkbox"
                name={name}
                checked={!!value.selected}
                onChange={() => onValueClick(value)}
                id={value.id}
              />
              <label
                className={clsx("form-check-label", styles.label)}
                htmlFor={value.id}
              >
                {value.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </Widget>
  );
};

export default WidgetAttributes;
