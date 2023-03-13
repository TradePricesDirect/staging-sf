import Image from "next/image";
import clsx from "clsx";

import styles from "./Thumbnail.module.scss";
import { FC } from "react";

const Thumbnail: FC<{ thumbnail: any; tall?: boolean }> = ({
  thumbnail,
  tall,
}) => {
  if (!thumbnail) {
    thumbnail = {
      url: "/images/placeholder-thumbnail.png",
      alt: "placeholder",
    };
  }

  return (
    <div className={clsx(styles.container, tall && styles.tall)}>
      <Image src={thumbnail.url} alt={thumbnail.alt} fill loading="eager" />
    </div>
  );
};

export default Thumbnail;
