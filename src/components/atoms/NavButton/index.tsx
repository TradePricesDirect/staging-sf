import { FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./NavButton.module.scss";
import clsx from "clsx";

const NavButton: FC<{
  href?: string;
  label?: string;
  icon?: IconDefinition;
  onClick?: any;
  hover?: boolean;
  primary?: boolean;
  secondary?: boolean;
  className?: string;
  dataIndex?: number;
  active?: boolean;
}> = ({
  href,
  label,
  icon,
  onClick,
  hover,
  primary,
  secondary,
  className,
  dataIndex,
  active,
}) => {
  const innerContent = (
    <>
      {/* <span className={styles.label}>{label}</span> */}
      {/* <div
        className={clsx(
          styles.container,
          primary ? styles.primary : "",
          secondary ? styles.secondary : ""
        )}
      > */}
      {label && <span className={styles.label}>{label}</span>}

      {icon && <FontAwesomeIcon icon={icon} />}
      {/* </div> */}
    </>
  );
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={clsx(
            styles.button,
            hover ? styles.hover : "",
            active ? styles.active : "",
            className
          )}
          onClick={onClick}
        >
          {innerContent}
        </Link>
      ) : (
        <button
          type="button"
          className={clsx(
            styles.button,
            hover ? styles.hover : "",
            active ? styles.active : "",
            className
          )}
          onClick={onClick}
          data-index={dataIndex}
        >
          {innerContent}
        </button>
      )}
    </>
  );
};

export default NavButton;
