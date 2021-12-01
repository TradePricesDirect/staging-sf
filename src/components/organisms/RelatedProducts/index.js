import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import ProductTile from "components/molecules/ProductTile";

import styles from "./RelatedProducts.module.scss";

const RelatedProducts = ({ title, products }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  if (!products.length) return null;

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-sm">
              <h3 className={styles.title}>{title}</h3>
            </div>

            <div className="col-sm-auto">
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
            {products.map((product) => (
              <div className={styles.slide} key={product.id}>
                <ProductTile product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
