import clsx from "clsx";
import Link from "next/link";

import styles from "./Box.module.scss";

const Box = ({ className, button, href, center, children, ...props }) => {
  const classes = clsx(styles.box, center && styles.isCentered, className);

  if (button) {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href}>
        <a className={classes}>{children}</a>
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Box;
