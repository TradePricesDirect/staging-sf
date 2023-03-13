import Link from "next/link";
import clsx from "clsx";
import Thumbnail from "components/molecules/Thumbnail";

import styles from "./BrandCarouselTile.module.scss";
import Button from "components/atoms/Button";
import { FC, useState } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

const BrandCarouselTile: FC<{
  name: string;
  href: string;
  image: any;
}> = ({ name, href, image }) => {
  const [hover, setHover] = useState(false);
  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  return (
    <div className={styles.container}>
      <Link href={href} className={styles.card} {...eventHandlers}>
        <img src={image?.filename} alt={image?.alt || name} />
      </Link>
    </div>
  );
};

export default BrandCarouselTile;
