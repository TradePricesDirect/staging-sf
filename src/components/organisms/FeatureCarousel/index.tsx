import { useEffect, useState, useCallback, useMemo, FC } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { icons } from "core/constants";
import useMenuLink from "hooks/useMenuLink";

import styles from "./FeatureCarousel.module.scss";
import clsx from "clsx";

import NavButton from "components/atoms/NavButton";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const FeatureCarousel: FC<{
  blok: {
    sbChildren: any[];
    viewAllButton?: boolean;
    className?: string;
    header?: string;
    bottomMargin?: number;
  };
}> = ({ blok }) => {
  const { sbChildren, viewAllButton, className, header, bottomMargin } = blok;
  const openMenu = useMenuLink();

  const childHeaders = useMemo(() => {
    return sbChildren.map((content) => ({
      id: `${content._uid}-nav`,
      label: content.brandName,
    }));
  }, [sbChildren]);

  const [viewportRef, embla] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const handleGoTo = (index) => embla?.scrollTo(index);

  const onSelect = useCallback(() => {
    if (!embla) return;

    setActiveIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setInterval(handleNext, 8000);

    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <section
      {...storyblokEditable(blok)}
      className={clsx("container-xxl", styles.wrap, className)}
      style={{ marginBottom: `${bottomMargin}px` }}
    >
      <header className={styles.headerContainer}>
        <div className="d-flex">
          <div className="col-sm m-auto">
            <h4 className={styles.header}>{header}</h4>
          </div>

          <div className="d-flex">
            <div className={styles.nav}>
              {viewAllButton && (
                <NavButton
                  onClick={openMenu}
                  label={"View All"}
                  className="mr-1"
                />
              )}
              {sbChildren.length > 1 && (
                <>
                  <NavButton
                    onClick={handlePrevious}
                    icon={icons.faArrowLeft}
                  />
                  <NavButton onClick={handleNext} icon={icons.faArrowRight} />
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        <div ref={viewportRef} className={styles.carouselWrap}>
          <div className={styles.carousel}>
            {sbChildren.map((child, index) => (
              <div key={child._uid} className={styles.slide}>
                <StoryblokComponent blok={child} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {sbChildren.length > 1 && (
        <div className={styles.navPills}>
          <ul className={styles.list} role="tablist">
            {childHeaders.map((content, index) => (
              <li key={content.id} role="presentation">
                <NavButton
                  label={content.label}
                  dataIndex={index}
                  onClick={() => handleGoTo(index)}
                  active={activeIndex === index}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FeatureCarousel;
