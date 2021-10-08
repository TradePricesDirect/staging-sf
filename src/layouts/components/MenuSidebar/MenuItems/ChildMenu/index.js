import Link from "next/link";
import menus from "./menus.json";

import styles from "./ChildMenu.module.scss";

const ChildMenu = ({ type }) => {
  const menu = menus[type];

  if (!menu) return null;

  return (
    <nav>
      <h4 className={styles.title}>{menu.title}</h4>

      <ul className={styles.menu}>
        {menu.items.map((item, i) => (
          <li key={`${type}-${i}`}>
            <Link href={item.path}>
              <a>{item.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ChildMenu;
