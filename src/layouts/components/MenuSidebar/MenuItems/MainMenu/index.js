import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import paths from "core/paths";
import { useOverlay } from "contexts/OverlayContext";
import NavLink from "components/atoms/NavLink";

import styles from "./MainMenu.module.scss";

const MainMenu = ({ menu }) => {
  return (
    <nav>
      <ul className={styles.list}>
        {menu?.items.map((item) => {
          return (
            <li key={item.id} className={styles.listItem}>
              {isTopLevelCategory(item?.category) ? (
                <CategoryNavLink item={item} />
              ) : (
                <NavLink item={item} className={styles.link} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainMenu;

const CategoryNavLink = ({ item }) => {
  const overlay = useOverlay();

  const { name, category } = item;

  return (
    <Link href={paths.category.replace("[slug]", category.slug)}>
      <a
        className={clsx(styles.link, styles.hasChildren)}
        onClick={(e) => {
          e.preventDefault();
          overlay.show(category.slug);
        }}
      >
        {name}
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </a>
    </Link>
  );
};

const isTopLevelCategory = (category) => {
  if (!category) return false;
  return ["kitchens", "bathrooms", "boilers"].includes(category.slug);
};
