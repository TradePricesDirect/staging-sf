import Image from "next/image";
import clsx from "clsx";
import styles from "./ProductGallery.module.scss";

const Thumb = ({ image, selected, onClick }) => {
  return (
    <div className={clsx(styles.thumb, selected && styles.selected)}>
      <button className={styles.thumbButton} onClick={onClick}>
        <Image
          className={styles.thumbImage}
          src={image.url}
          alt={image.alt}
          fill
          loading="eager"
        />
      </button>
    </div>
  );
};

export default Thumb;
