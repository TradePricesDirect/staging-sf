import Link from "next/link";
import { useOverlay } from "contexts/OverlayContext";

import styles from "./Navigation.module.scss";

const Navigation = () => {
  const overlay = useOverlay();

  const handleMenuClick = (type) => (e) => {
    e.preventDefault();
    overlay.show(type);
  };

  return (
    <div className={styles.wrap}>
      <ul className={styles.menu}>
        <li>
          <Link href="/category/kitchens">
            <a
              className="btn btn-sm"
              onClick={handleMenuClick("menu.kitchens")}
            >
              Kitchens
            </a>
          </Link>
        </li>
        <li>
          <Link href="/category/bathrooms">
            <a
              className="btn btn-sm"
              onClick={handleMenuClick("menu.bathrooms")}
            >
              Bathrooms
            </a>
          </Link>
        </li>
        <li>
          <Link href="/category/boilers">
            <a className="btn btn-sm" onClick={handleMenuClick("menu.boilers")}>
              Boilers
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
