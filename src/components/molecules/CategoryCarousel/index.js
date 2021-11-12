import { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import paths from "core/paths";
import { getCategoryThumbnail } from "core/categories";
import CategoryTileTall from "components/molecules/CategoryTileTall";

import styles from "./CategoryCarousel.module.scss";

const CategoryCarousel = ({ title, viewAll, categories }) => {
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
                <Link href={viewAll}>
                  <a className="btn btn-sm btn-circle me-4">View All</a>
                </Link>
              )}

              <div className={styles.nav}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handlePrevious}
                >
                  <span className="visually-hidden">Previous</span>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleNext}
                >
                  <span className="visually-hidden">Next</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div ref={emblaRef} className={styles.carouselWrap}>
          <div className={styles.carousel}>
            {categories.map(({ id, name, slug }) => (
              <div key={id} className={styles.slide}>
                <CategoryTileTall
                  name={name}
                  href={paths.category.replace("[slug]", slug)}
                  backgroundImage={getCategoryThumbnail(slug)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
