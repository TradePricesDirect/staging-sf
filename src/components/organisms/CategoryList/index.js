import paths from "core/paths";
import CategoryTile from "components/molecules/CategoryTile";

import styles from "./CategoryList.module.scss";

const CategoryList = ({ categories }) => {
  return (
    <section className={styles.wrap}>
      <ul className={styles.list}>
        {categories?.map(({ id, name, slug, backgroundImage }) => (
          <li key={`category-list-${id}`}>
            <CategoryTile
              name={name}
              href={
                paths.hasOwnProperty(slug)
                  ? paths[slug]
                  : paths.category.replace("[slug]", slug)
              }
              backgroundImage={backgroundImage}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
