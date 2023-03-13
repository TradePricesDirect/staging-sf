import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC } from "react";
import styles from "./NavIcon.module.scss";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { icons } from "core/constants";

const NavIcon: FC<{
  icon?: IconDefinition;
  color?: string;
}> = ({ icon, color }) => {
  return (
    <div className={clsx(styles.container, styles[color || "secondary"])}>
      <FontAwesomeIcon icon={icon || icons.faArrowRight} />
    </div>
  );
};

export default NavIcon;
