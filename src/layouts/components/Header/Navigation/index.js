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
          <Link href="/category/kitchens" className="btn btn-sm" onClick={handleMenuClick("kitchens")}>
            Kitchens
          </Link>
        </li>
        <li>
          <Link href="/category/bathrooms" className="btn btn-sm" onClick={handleMenuClick("bathrooms")}>
            Bathrooms
          </Link>
        </li>
        <li>
          <Link href="/category/boilers" className="btn btn-sm" onClick={handleMenuClick("boilers")}>
            Boilers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
