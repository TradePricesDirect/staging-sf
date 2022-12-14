import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import paths from "core/paths";

import styles from "./CategoryPopular.module.scss";

const CategoryPopular = ({ title, description, viewAll, slides }) => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: "center",
    startIndex: 1,
    speed: 5,
  });

  const [parallaxValues, setParallaxValues] = useState([]);

  const handlePrevious = useCallback(() => {
    return embla && embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    return embla && embla.scrollNext();
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.getTarget();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * -5 * 100;
    });
    setParallaxValues(styles);
  }, [embla, setParallaxValues]);

  useEffect(() => {
    if (!embla) return;
    onScroll();
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
  }, [embla, onScroll]);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm">
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
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

      <div ref={emblaRef} className={styles.carouselWrap}>
        <div className={styles.carousel}>
          {slides.map(({ id, name, href, image }, index) => (
            <div key={`popular-${id}`} className={styles.slide}>
              <Link href={href} className={styles.inner}>
                <>
                  <div
                    className={styles.parallax}
                    style={{
                      transform: `translateX(${parallaxValues[index]}%)`,
                    }}
                  >
                    <div className={styles.imageWrap}>
                      <div className={styles.image}>
                        <Image
                          src={image}
                          alt={name}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          loading={index < 5 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  </div>

                  <Skeleton
                    height="100%"
                    baseColor="#e9ecef"
                    highlightColor="#ced4da"
                    className={styles.loader}
                  />
                </>

              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPopular;
