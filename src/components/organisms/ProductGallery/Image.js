import { SideBySideMagnifier } from "react-image-magnifiers";

import styles from "./ProductGallery.module.scss";

const Image = ({ image }) => {
  return (
    <div className={styles.slide}>
      <SideBySideMagnifier
        imageSrc={image.url}
        alt={image.alt}
        alwaysInPlace
        transitionSpeedInPlace={0.2}
      />
    </div>
  );
};

export default Image;
