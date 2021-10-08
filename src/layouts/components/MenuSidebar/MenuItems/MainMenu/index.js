import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { useOverlay } from "contexts/OverlayContext";
import menu from "./menu.json";

import styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const overlay = useOverlay();

  return (
    <nav>
      <ul className={styles.menu}>
        {menu.map((item) => {
          const hasChildren = item.hasOwnProperty("overlay");

          return (
            <li key={item.id}>
              <Link href={item.path}>
                {hasChildren ? (
                  <a
                    className={styles.hasChildren}
                    onClick={(e) => {
                      e.preventDefault();
                      overlay.show(item.overlay);
                    }}
                  >
                    {item.title}
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </a>
                ) : (
                  <a>{item.title}</a>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainMenu;
