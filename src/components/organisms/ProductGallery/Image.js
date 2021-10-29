import { SideBySideMagnifier } from "react-image-magnifiers";

import styles from "./ProductGallery.module.scss";

const Image = ({ image }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideInner}>
        <SideBySideMagnifier
          className={styles.slideImage}
          imageSrc={image.url}
          alt={image.alt}
          alwaysInPlace
          transitionSpeedInPlace={0.2}
        />
      </div>
    </div>
  );
};

export default Image;
