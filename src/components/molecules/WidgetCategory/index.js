import Link from "next/link";
import Widget from "components/molecules/Widget";
import paths from "core/paths";

import styles from "./WidgetCategory.module.scss";
import _ from "lodash";

const WidgetCategory = ({ categories }) => {
  if (!categories.length) return null;

  const categoryList = _.sortBy(categories, "name");

  return (
    <Widget title="Categories" isOpen>
      <ul className={styles.list}>
        {categoryList.map((category) => (
          <li key={category.id}>
            <Link href={paths.category.replace("[slug]", category.slug)}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Widget>
  );
};

export default WidgetCategory;
