import Link from "next/link";
import clsx from "clsx";
import Thumbnail from "components/molecules/Thumbnail";

import styles from "./CategoryTile.module.scss";

const CategoryTile = ({ name, href, backgroundImage }) => {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.image}>
        <Thumbnail thumbnail={backgroundImage} />
      </div>

      <div className={styles.content}>
        <h2 className={clsx("btn", styles.title)}>{name}</h2>
      </div>
    </Link>
  );
};

export default CategoryTile;
