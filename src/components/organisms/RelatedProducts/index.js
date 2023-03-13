import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { icons } from "core/constants";
import ProductTile from "components/molecules/ProductTile";

import styles from "./RelatedProducts.module.scss";
import NavButton from "components/atoms/NavButton";

const RelatedProducts = ({ header, products }) => {
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
      <header className={styles.headerContainer}>
        <div className="container">
          <div className="d-flex">
            <div className="col-sm m-auto">
              <h4 className={styles.header}>{header}</h4>
            </div>
            <div className="d-flex">
              <div className={styles.nav}>

                <>
                  <NavButton onClick={handlePrevious} icon={icons.faArrowLeft} />
                  <NavButton onClick={handleNext} icon={icons.faArrowRight} />
                </>
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
