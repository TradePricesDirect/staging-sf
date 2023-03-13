import Link from "next/link";
import clsx from "clsx";
import Thumbnail from "components/molecules/Thumbnail";

import styles from "./RecentlyViewedTile.module.scss";
import Button from "components/atoms/Button";
import { useState } from "react";
import Image from "next/image";

const RecentlyViewedTile = ({ name, href, image }) => {
  const [hover, setHover] = useState(false);
  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  return (
    <div className={styles.container}>
      <Link href={href} className={styles.card}
        {...eventHandlers}>
        <Image
          className={styles.image}
          src={""}
          alt="Quooker"
          fill
        />
      </Link>
    </div>
  );
};

export default RecentlyViewedTile;
