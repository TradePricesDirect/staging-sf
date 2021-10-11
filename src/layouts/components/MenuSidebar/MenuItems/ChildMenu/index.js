import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-light-svg-icons";
import useDisclosure from "hooks/useDisclosure";
import NavLink from "components/atoms/NavLink";

import styles from "./ChildMenu.module.scss";

const ChildMenu = ({ menu }) => {
  if (!menu) return null;

  return (
    <nav>
      <h4 className={styles.title}>{menu?.name}</h4>

      <ul className={styles.list}>
        {menu?.items.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default ChildMenu;

const NavItem = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure(false);

  const hasChildren = item.children ? item.children.length > 0 : false;

  if (!hasChildren) {
    return (
      <li className={styles.listItem}>
        <NavLink item={item} className={styles.link} />
      </li>
    );
  }

  const handleToggle = (e) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <li className={clsx(styles.listItem, styles.hasChild)}>
      <NavLink item={item} onClick={handleToggle} className={styles.link}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </div>
      </NavLink>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.list}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <li className={styles.listItem}>
              <NavLink
                item={{ ...item, name: `All ${item.name}` }}
                className={styles.link}
              />
            </li>

            {item.children.map((subItem) => (
              <li key={subItem.id}>
                <NavLink item={subItem} className={styles.link} />
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
