import { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import CategoryTile from "components/molecules/CategoryTile";

import styles from "./CategoryCarousel.module.scss";

const CategoryCarousel = ({ categories }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-sm">
              <h6>Browse</h6>
              <h3>Endless Products at Trade Prices</h3>
            </div>

            <div className="col-sm-auto">
              <Link href="/shop">
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
        </div>
      </header>

      <div className="container">
        <div ref={viewportRef} className={styles.carouselWrap}>
          <div className={styles.carousel}>
            {categories?.map((category) => (
              <div className={styles.slide} key={category.id}>
                <CategoryTile category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
