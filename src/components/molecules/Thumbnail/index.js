import Image from "next/image";
import clsx from "clsx";

import styles from "./Thumbnail.module.scss";

const Thumbnail = ({ thumbnail, tall }) => {
  if (!thumbnail) {
    thumbnail = {
      url: "/images/placeholder-thumbnail.png",
      alt: "placeholder",
    };
  }

  return (
    <div className={clsx(styles.image, tall && styles.tall)}>
      <Image
        src={thumbnail.url}
        alt={thumbnail.alt}
        layout="fill"
        objectFit="cover"
        loading="eager"
      />
    </div>
  );
};

export default Thumbnail;
