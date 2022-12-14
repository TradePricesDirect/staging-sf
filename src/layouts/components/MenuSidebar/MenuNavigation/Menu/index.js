import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import paths from "core/paths";
import useDisclosure from "hooks/useDisclosure";

import styles from "./Menu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";

const Menu = ({ items }) => {
  return (
    <nav className={styles.wrap}>
      <ul className={styles.menu}>
        {items.map((item) => {
          return (
            <li key={item.id} className={styles.menuItem}>
              {item?.__typename === "Category" ? (
                <CategoryLink item={item} />
              ) : (
                <MenuLink item={item} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;

const CategoryLink = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure();

  const url = paths.category.replace("[slug]", item.slug);

  const hasChildren = _.size(item.children) > 0;

  const handleClick = (e) => {
    onToggle();
    e.preventDefault();
  };

  if (hasChildren) {
    return (
      <>
        <Link href={url} className={clsx(styles.link, styles.hasChildren)}
          onClick={handleClick}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} fixedWidth />
          </div>
          {item.name}
        </Link>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.submenu}
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              <>
                <Link href={url} className={styles.link}>
                  {"Shop All "}{item.name}
                </Link>
                {item.children.map((child) => (
                  <CategoryLink key={child.id} item={child} />
                ))}
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <Link href={url} className={styles.link}>
      {item.name}
    </Link>
  );
};

const MenuLink = ({ item: { name, href } }) => {
  return (
    <Link href={href} className={styles.link}>
      {name}
    </Link>
  );
};
