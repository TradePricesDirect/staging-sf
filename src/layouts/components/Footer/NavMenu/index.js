import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import styles from "./NavMenu.module.scss";

const NavMenu = ({ title, menu }) => {
  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      <nav>
        <ul className={styles.menu}>
          {menu.map(({ path, label }) => (
            <li key={uuidv4()}>
              <Link href={path}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
