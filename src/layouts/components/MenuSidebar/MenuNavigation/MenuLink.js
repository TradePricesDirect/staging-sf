import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./MenuNavigation.module.scss";

const MenuLink = ({ name, slug, url }) => {
  const overlay = useOverlay();

  const isFeatured = isFeaturedCategory(slug);

  const handleClick = (e) => {
    if (isFeatured) {
      overlay.show(slug);
      e.preventDefault();
    }
  };

  return (
    <Link href={url} className={clsx(styles.link, isFeatured && styles.hasChildren)}
      onClick={handleClick}>
      {name}
      {isFeatured && (
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </Link >
  );
};

export default MenuLink;

const isFeaturedCategory = (slug) => {
  return ["kitchens", "bathrooms", "boilers"].includes(slug);
};
