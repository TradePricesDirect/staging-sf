import Link from "next/link";
import paths from "paths";

import styles from "./BackLink.module.scss";

const BackLink = () => {
  return (
    <div className={styles.link}>
      <Link href={paths.home}>
        <a className="btn btn-sm btn-circle">Cancel</a>
      </Link>
    </div>
  );
};

export default BackLink;
