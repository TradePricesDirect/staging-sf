import { useCallback } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";

import styles from "./ImageGallery.module.scss";

const ImageGallery = ({ images }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <div className={styles.wrap}>
      <div className={styles.gallery}>
        <div ref={viewportRef} className={styles.carousel}>
          <div className={styles.carouselContainer}>
            {images.map((image, index) => (
              <Slide key={`image-gallery-${index}`} image={image} />
            ))}
          </div>
        </div>

        <div className={styles.carouselNav}>
          <button type="button" className="btn btn-sm" onClick={handlePrevious}>
            <span className="visually-hidden">Previous</span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <button type="button" className="btn btn-sm" onClick={handleNext}>
            <span className="visually-hidden">Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

const Slide = ({ image }) => {
  return (
    <div className={styles.slide}>
      <Image
        src={image}
        alt=""
        layout="fill"
        objectFit="cover"
        className={styles.image}
      />

      <Skeleton
        height="100%"
        baseColor="#e9ecef"
        highlightColor="#ced4da"
        className={styles.loader}
      />
    </div>
  );
};
