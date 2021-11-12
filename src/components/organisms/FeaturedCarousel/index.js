import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import paths from "core/paths";
import NavPills from "components/atoms/NavPills";

import styles from "./FeaturedCarousel.module.scss";

const FeaturedCarousel = ({ slides }) => {
  const thumbnails = useMemo(() => {
    return slides.map((s) => ({
      id: uuidv4(),
      name: s?.type?.displayName || "Featured",
    }));
  }, [slides.length]);

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
      <div className="container">
        <header className={styles.header}>
          <Link href={paths.shop}>
            <a className="btn btn-sm btn-circle">View All</a>
          </Link>

          <div className={styles.nav}>
            <button
              type="button"
              className="btn btn-sm"
              onClick={handlePrevious}
            >
              <span className="visually-hidden">Previous</span>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button type="button" className="btn btn-sm" onClick={handleNext}>
              <span className="visually-hidden">Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </header>

        <div className={styles.container}>
          <h3 className="vertical-text">
            <span>Featured Products</span>
          </h3>

          <div ref={viewportRef} className={styles.carouselWrap}>
            <div className={styles.carousel}>
              {slides.map((slide, index) => (
                <div
                  key={`featured-carousel-${index}`}
                  className={styles.slide}
                >
                  {slide}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.navPills}>
          <NavPills
            values={thumbnails}
            activeIndex={activeIndex}
            onValueClick={handleGoTo}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
