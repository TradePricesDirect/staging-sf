import useEmblaCarousel from "embla-carousel-react";
import ProductTile from "components/molecules/ProductTile";

import styles from "./ProductCarousel.module.scss";

const ProductCarousel = ({ products }) => {
  const [viewportRef] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  return (
    <div ref={viewportRef} className={styles.carouselWrap}>
      <div className={styles.carousel}>
        {products.map((product) => (
          <div className={styles.slide} key={product.id}>
            <ProductTile product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
