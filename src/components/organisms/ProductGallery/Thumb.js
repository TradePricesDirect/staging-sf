import Image from "next/image";
import clsx from "clsx";
import styles from "./ProductGallery.module.scss";

const Thumb = ({ image, selected, onClick }) => {
  return (
    <div className={clsx(styles.thumb)}>
      <button className={clsx(styles.thumbButton, selected && styles.selected)} onClick={onClick}>
        <Image
          className={styles.image}
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
