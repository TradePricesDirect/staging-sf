import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import NavPills from "components/atoms/NavPills";
import Quooker from "./Quooker";

import styles from "./FeaturedProductsCarousel.module.scss";
import paths from "core/paths";

const THUMBNAILS = [
  { id: uuidv4(), name: "Quooker" },
  { id: uuidv4(), name: "Quooker" },
];

const FeaturedProductsCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const handleGoTo = (index) => embla.scrollTo(index);

  const onSelect = useCallback(() => {
    if (!embla) return;

    setActiveIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <section className={styles.wrap}>
      <h3 className="vertical-text">
        <span>Featured Products</span>
      </h3>

      <header className={styles.header}>
        <Link href={paths.shop}>
          <a className="btn btn-sm btn-circle">View All</a>
        </Link>

        <div className={styles.nav}>
          <button type="button" className="btn btn-sm" onClick={handlePrevious}>
            <span className="visually-hidden">Previous</span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <button type="button" className="btn btn-sm" onClick={handleNext}>
            <span className="visually-hidden">Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </header>

      <div ref={viewportRef} className={styles.carouselWrap}>
        <div className={styles.carousel}>
          <div className={styles.slide}>
            <Quooker />
          </div>
          <div className={styles.slide}>
            <Quooker />
          </div>
        </div>
      </div>

      <div className={styles.navPills}>
        <NavPills
          values={THUMBNAILS}
          activeIndex={activeIndex}
          onValueClick={handleGoTo}
        />
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
