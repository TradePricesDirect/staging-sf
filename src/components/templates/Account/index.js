import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import menu from "./menu";

import styles from "./Account.module.scss";

const Account = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <nav className={styles.nav}>
              <ul className={styles.list}>
                {menu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>
                      <a className={pathname == item.href ? styles.active : ""}>
                        <FontAwesomeIcon icon={item.icon} fixedWidth />
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-12 col-md-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
