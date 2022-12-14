import Link from "next/link";
import paths from "core/paths";

import styles from "./Header.module.scss";

const Header = ({ title, subtitle }) => {
  return (
    <div className={styles.wrap}>
      <div className="container px-0">
        <div className={styles.header}>
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-md">
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className="col-12 col-md-auto">
              <Link href={paths.requestQuote} className="btn btn-primary">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
