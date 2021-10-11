import NavLink from "components/atoms/NavLink";

import styles from "./NavMenu.module.scss";

const NavMenu = ({ menu }) => {
  return (
    <>
      <h3 className={styles.title}>{menu.name}</h3>
      <nav>
        <ul className={styles.list}>
          {menu.items.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
