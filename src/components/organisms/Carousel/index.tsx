import React, { FC, useCallback, useEffect, Fragment } from "react";
import useEmblaCarousel from "embla-carousel-react";

import paths from "core/paths";
import useMenuLink from "hooks/useMenuLink";
import CategoryTile from "components/molecules/CategoryTile";

import styles from "./Carousel.module.scss";
import NavButton from "components/atoms/NavButton";
import clsx from "clsx";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";
import BrandCarouselTile from "components/molecules/BrandCarouselTile";
import RecentlyViewedTile from "components/molecules/RecentlyViewedTile";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { icons } from "core/constants";

const Carousel: FC<{
  blok: {
    body: any;
    type: string;
    viewAllButton?: boolean;
    header?: string;
    height: number;
    limit: number;
    cols?: number;
    className?: string;
    sbChildren?: any[];
    bottomMargin?: number;
    _uid?: string;
  };
  data: any;
}> = ({ blok, data }) => {
  const {
    type,
    viewAllButton,
    header,
    height,
    cols = 12,
    className,
    limit,
    sbChildren = [],
    bottomMargin,
    _uid,
  } = blok;

  const openMenu = useMenuLink();

  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

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

  const gridAutoColumnsStyle = `calc(${
    100 / (isMobile ? 1 : isTablet ? 2 : cols)
  }%)`;

  return (
    <section
      {...storyblokEditable(blok)}
      className={clsx("container-xxl", styles.wrap, className)}
      style={{ marginBottom: `${bottomMargin}px` }}
    >
      <header className={styles.headerContainer}>
        <div className="container">
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
                {data?.length > cols && (
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
        </div>
      </header>

      <div className={clsx("container", styles.container)}>
        <div ref={viewportRef} className={styles.carouselWrap}>
          <div
            className={styles.carousel}
            style={{
              gridAutoColumns: gridAutoColumnsStyle,
              height: `${height || 400}px`,
            }}
          >
            {data?.map(({ id, name, slug, backgroundImage }, index) => (
              <Fragment key={`data-carousel-${_uid}-${index}`}>
                {type.split(".")[0] === "categories" && (
                  <CategoryTile
                    key={id}
                    name={name}
                    href={paths.plp.replace("[slug]", slug)}
                    image={backgroundImage}
                  />
                )}
                {type === "brands" && (
                  <BrandCarouselTile
                    key={id}
                    name={name}
                    href={`${paths.plp.replace("[slug]", "")}?brand=${slug}`}
                    image={backgroundImage}
                  />
                )}
                {type === "recent" && (
                  <RecentlyViewedTile
                    key={id}
                    name={name}
                    href={paths.category.replace("[slug]", slug)}
                    image={backgroundImage}
                  />
                )}
              </Fragment>
            ))}
            {sbChildren?.map((child) => (
              <StoryblokComponent blok={child} key={child._uid} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
