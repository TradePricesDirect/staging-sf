import CategoryTile from "components/molecules/CategoryTile";

import styles from "./CategoryList.module.scss";

const CategoryList = ({ categories }) => {
  return (
    <section className={styles.wrap}>
      <ul className={styles.list}>
        {categories?.map((category) => (
          <li key={category.id}>
            <CategoryTile category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
