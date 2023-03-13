import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import paths from "core/paths";


import styles from "./KitchenRangeTile.module.scss";

const KitchenRangeTile = ({ range }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const handleColor = useCallback(
    (color) => {
      if (embla) {
        const index = range.images.findIndex((image) =>
          _.includes(image, color)
        );
        if (index >= 0) embla.scrollTo(index, true);
      }
    },
    [embla]
  );

  const url = paths.kitchenRange.replace("[slug]", range.slug);

  return (
    <div className={styles.wrap}>
      <div className={styles.gallery}>
        <div ref={viewportRef} className={styles.carousel}>
          <div className={styles.carouselContainer}>
            {range.images.map((image, index) => (
              <Slide key={`${range.slug}-image-${index}`} image={image} />
            ))}
          </div>
        </div>

        {range.images.length > 1 && (
          <div className={styles.carouselNav}>
            <button
              type="button"
              className="btn btn-sm"
              onClick={handlePrevious}
            >
              <span className="visually-hidden">Previous</span>
              <FontAwesomeIcon icon={icons.faArrowLeft} />
            </button>

            <button type="button" className="btn btn-sm" onClick={handleNext}>
              <span className="visually-hidden">Next</span>
              <FontAwesomeIcon icon={icons.faArrowRight} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.colorsWrap}>
        <ul className={styles.colors}>
          {range.door_colors.map(({ name, slug, value }) => (
            <li key={`${range.slug}-colour-${slug}`}>
              <button
                type="button"
                onClick={() => handleColor(slug)}
                className={styles.colorSwatch}
                style={{ background: value }}
                data-color={slug}
              >
                <span className="visually-hidden">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <div className="row align-items-center justify-content-between gx-4 gy-2">
          <div className="col-auto">
            <Link href={url} className={styles.title}>
              {range.title}
            </Link>
            {/* <div className={styles.price}>
              <Money
                prefix="From"
                money={range.price}
                maximumFractionDigits={0}
              />
            </div> */}
          </div>
          <div className="col-auto">
            <Link href={url} className="btn btn-outline-primary">
              View Range
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenRangeTile;

const Slide = ({ image }) => {
  return (
    <div className={styles.slide}>
      <Image
        src={image}
        alt=""
        layout="fill"
        objectFit="cover"
        className={styles.image}
      />

      <Skeleton
        height="100%"
        baseColor="#e9ecef"
        highlightColor="#ced4da"
        className={styles.loader}
      />
    </div>
  );
};
