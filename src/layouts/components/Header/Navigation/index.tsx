import Link from "next/link";
import styles from "./Navigation.module.scss";
import getFeaturedCategories from "utils/getFeaturedCategories";
import { useMemo } from "react";
import paths from "core/paths";

const Navigation = ({ categories, featuredCategories }) => {
  const featured = useMemo(
    () => getFeaturedCategories(categories, featuredCategories),
    [categories, featuredCategories]
  );

  return (
    <div className={styles.wrap}>
      <ul className={styles.menu}>
        {featured.map((category) => (
          <li key={`navigation-button-${category.slug}`}>
            <Link className={styles.link} href={paths.content[category.slug]}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
