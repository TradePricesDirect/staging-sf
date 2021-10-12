import Link from "next/link";
import clsx from "clsx";
import paths from "core/paths";
import Thumbnail from "components/molecules/Thumbnail";

import styles from "./CategoryTile.module.scss";

const CategoryTile = ({ category }) => {
  return (
    <Link href={paths.category.replace("[slug]", category.slug)}>
      <a className={styles.card}>
        <div className={styles.image}>
          <Thumbnail thumbnail={category.backgroundImage} />
        </div>

        <h2 className={clsx("btn", styles.title)}>{category.name}</h2>
      </a>
    </Link>
  );
};

export default CategoryTile;
