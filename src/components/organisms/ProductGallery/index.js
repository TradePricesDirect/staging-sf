import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import Image from "./Image";
import Thumb from "./Thumb";

import styles from "./ProductGallery.module.scss";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainViewportRef, embla] = useEmblaCarousel({
    draggable: false,
  });

  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "trimSnaps",
    selectedClass: "",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  useEffect(() => {
    if (embla) embla.scrollTo(0, true);
  }, [images]);

  return (
    <div className={styles.wrap}>
      <div ref={mainViewportRef} className={styles.carouselWrap}>
        <div className={styles.carousel}>
          {images.map((image) => (
            <Image key={image.id} image={image} />
          ))}
        </div>
      </div>

      <div className={styles.thumbs}>
        {images.length > 1 && (
          <button type="button" className="btn btn-sm" onClick={handlePrevious}>
            <span className="visually-hidden">Previous</span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}

        <div ref={thumbViewportRef} className={styles.thumbsWrap}>
          <div className={styles.thumbsCarousel}>
            {images.map((image, index) => (
              <Thumb
                key={`thumb-${image.id}`}
                image={image}
                selected={index === selectedIndex}
                onClick={() => onThumbClick(index)}
              />
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <button type="button" className="btn btn-sm" onClick={handleNext}>
            <span className="visually-hidden">Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
