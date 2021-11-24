import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";

import styles from "./SubMenuLink.module.scss";
import paths from "core/paths";

const SubMenuLink = ({ name, slug, onClick }) => {
  const handleClick = (e) => {
    onClick();
    e.preventDefault();
  };

  return (
    <a
      href={paths.category.replace("[slug]", slug)}
      onClick={handleClick}
      className={clsx(styles.link, styles.hasChildren)}
    >
      {name}

      <div className={styles.icon}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </a>
  );
};

export default SubMenuLink;
