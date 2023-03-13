import clsx from "clsx";


import styles from "./SubMenuLink.module.scss";
import paths from "core/paths";
import NavIcon from "components/atoms/NavIcon";
import { icons } from "core/constants";

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
      <NavIcon />
    </a>
  );
};

export default SubMenuLink;
