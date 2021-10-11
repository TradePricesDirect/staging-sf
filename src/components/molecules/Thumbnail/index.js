import Image from "next/image";

import styles from "./Thumbnail.module.scss";

const Thumbnail = ({ source }) => {
  let { thumbnail2x: thumbnail } = source;

  if (!thumbnail) {
    thumbnail = {
      url: "/images/placeholder-thumbnail.png",
      alt: "placeholder",
    };
  }

  return (
    <div className={styles.image}>
      <Image
        src={thumbnail.url}
        alt={thumbnail.alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Thumbnail;
