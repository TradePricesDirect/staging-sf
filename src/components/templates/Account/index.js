import { icons } from "core/constants";
import menu from "./menu";
import Button from "components/atoms/Button";

import styles from "./Account.module.scss";

const Account = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className="container py-4">
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menu.map((item) => (
              <li key={item.id}>
                <Button
                  path={item.href}
                  className={styles.navItem}
                  submit
                  label={item.name}
                  icon={icons.faArrowRight}
                />
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
