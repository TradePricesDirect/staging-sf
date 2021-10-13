import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "./Image";
import Thumb from "./Thumb";

import styles from "./ProductGallery.module.scss";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainViewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
  });

  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
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

  return (
    <div className={styles.wrap}>
      <div ref={mainViewportRef} className={styles.carouselWrap}>
        <div className={styles.carousel}>
          {images.map((image) => (
            <Image key={image.id} image={image} />
          ))}
        </div>
      </div>

      <div ref={thumbViewportRef} className={styles.thumbsWrap}>
        <div className={styles.thumbs}>
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
    </div>
  );
};

export default ProductGallery;
