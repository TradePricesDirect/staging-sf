import Link from "next/link";
import clsx from "clsx";

import { FC, useState } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import paths from "core/paths";
import styles from "./PromoCarouselTile.module.scss";

const PromoCarouselTile: FC<{
  blok: {
    name: string;
    header?: string;
    subHeader?: string;
    image: any;
    buttonLabel: any;
    category: string;
    brand?: string;
  };
}> = ({ blok }) => {
  const { header, subHeader, category, brand, image, buttonLabel } = blok;
  const [hover, setHover] = useState(false);
  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return (
    <div {...storyblokEditable(blok)} className={styles.container}>
      <Link
        href={`${paths.plp.replace("[slug]", category)}${
          brand ? `?brand=${brand}` : ""
        }`}
        className={styles.card}
        {...eventHandlers}
      >
        <div className={styles.header}>
          <h4>{header}</h4>
          <p>{subHeader}</p>
        </div>

        {image && (
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={`${image.filename}/m/`}
              alt={image.alt}
              // fill
              height={300}
              width={300}
            />
          </div>
        )}

        <div className={styles.stripe}></div>
        <div className={clsx(styles.sticker, hover ? styles.hover : "")}>
          {" "}
          <h5>{buttonLabel}</h5>
        </div>
      </Link>
    </div>
  );
};

export default PromoCarouselTile;
