import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

import styles from "./Box.module.scss";

const Box: FC<{
  className?: any;
  button?: any;
  href?: any;
  center?: any;
  children?: any;
}> = ({ className, button, href, center, children, ...props }) => {
  const classes = clsx(styles.box, center && styles.isCentered, className);

  if (button) {
    return (
      <button className={classes} {...props}>
        <div>{children}</div>
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        <div>{children}</div>
      </Link>
    );
  }

  return (
    <div className={classes}>
      <div>{children}</div>
    </div>
  );
};

export default Box;
