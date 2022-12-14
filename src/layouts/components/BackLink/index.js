import Link from "next/link";
import paths from "core/paths";

import styles from "./BackLink.module.scss";

const BackLink = () => {
  return (
    <div className={styles.link}>
      <Link href={paths.home} className="btn btn-sm btn-circle">
        Cancel
      </Link>
    </div>
  );
};

export default BackLink;
