import Link from "next/link";
import clsx from "clsx";
import Thumbnail from "components/molecules/Thumbnail";

import styles from "./CategoryTileTall.module.scss";

const CategoryTileTall = ({ name, href, backgroundImage }) => {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <div className={styles.image}>
          <Thumbnail thumbnail={backgroundImage} tall />
        </div>

        <div className={styles.content}>
          <h2 className={clsx("btn", styles.title)}>{name}</h2>
        </div>
      </a>
    </Link>
  );
};

export default CategoryTileTall;
