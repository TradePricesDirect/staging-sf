import { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import CategoryTile from "components/molecules/CategoryTile";

import styles from "./CategoryStyles.module.scss";

const CategoryStyles = ({ title, viewAll, slides }) => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <section className={styles.wrap}>
      <div className="container">
        <header className={styles.header}>
          <div className="row align-items-center">
            <div className="col-12 col-sm">
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className="col-12 col-sm-auto">
              {viewAll && (
                <Link href={viewAll} className="btn btn-sm btn-circle me-4">
                  View All
                </Link>
              )}

              <div className={styles.nav}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handlePrevious}
                >
                  <span className="visually-hidden">Previous</span>
                  <FontAwesomeIcon icon={icons.faArrowLeft} />
                </button>

                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleNext}
                >
                  <span className="visually-hidden">Next</span>
                  <FontAwesomeIcon icon={icons.faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div ref={emblaRef} className={styles.carouselWrap}>
          <div className={styles.carousel}>
            {slides.map(({ id, name, href, backgroundImage }) => (
              <div key={id} className={styles.slide}>
                <CategoryTile
                  name={name}
                  href={href}
                  backgroundImage={backgroundImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryStyles;
