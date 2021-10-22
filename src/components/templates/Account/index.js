import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "components/organisms/Box";
import menu from "./menu";

import styles from "./Account.module.scss";

const Account = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className="container py-4">
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menu.map((item) => (
              <li key={item.id}>
                <Box className={styles.navItem} href={item.href} center>
                  <FontAwesomeIcon icon={item.icon} className="me-2" />
                  {item.name}
                </Box>
              </li>
            ))}
          </ul>
        </nav>

        {children}
      </div>
    </div>
  );
};

export default Account;
