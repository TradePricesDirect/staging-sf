import { Fragment, useMemo, useCallback, useEffect, useState } from "react";
import getFeaturedCategories from "utils/getFeaturedCategories";
import clsx from "clsx";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";
import useEmblaCarousel from "embla-carousel-react";
import CategoryTile from "components/molecules/CategoryTile";
import NavButton from "components/atoms/NavButton";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Button from 'components/atoms/Button'

import styles from "./StepProducts.module.scss";

const StepProducts = ({ categories, featuredCategories, onChange, selectedProducts, onContinue }) => {
    const featured = useMemo(
        () => getFeaturedCategories(categories, featuredCategories),
        [categories, featuredCategories]
    );

    const [selected, setSelected] = useState(selectedProducts);

    useEffect(() => {
        onChange(selected)
    }, [selected]);

    const toggleItem = item => {
        if (!selected?.includes(item)) {
            setSelected(selectedProducts => [...selectedProducts, item])
        } else {
            setSelected(selectedProducts => selected.filter(i => i !== item))
        }
    }

    const cols = 4;
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

    const gridAutoColumnsStyle = `calc(${100 / (isMobile ? 1 : isTablet ? 2 : cols)
        }%)`;

    return (
        <>
            <header className={styles.headerContainer}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 m-auto">
                            <h2 className={styles.header}>What Products are you Interested in?</h2>
                            <h4 className={styles.subheader}>Select all categories you&apos;re looking for below</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className={styles.nav}>
                            {featured?.length > cols && (
                                <>
                                    <NavButton onClick={handlePrevious} icon={faArrowLeft} />
                                    <NavButton onClick={handleNext} icon={faArrowRight} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className={clsx("container", styles.container)}>
                <div ref={viewportRef} className={styles.carouselWrap}>
                    <div style={{
                        display: 'grid',
                        gridAutoColumns: gridAutoColumnsStyle,
                        height: "400px",
                        gridAutoFlow: 'column'
                    }}
                    >
                        {featured?.map((category, index) => (
                            <Fragment key={`data-carousel-${index}`}>
                                <CategoryTile
                                    selected={selected?.includes(category.name)}
                                    useBackgroundImage
                                    key={index}
                                    name={category.name}
                                    onClick={() => { toggleItem(category.name) }}
                                    image={category.backgroundImage ? category.backgroundImage : ''}
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
                {selected.length > 0 && (
                    <div className={styles.buttonWrap}>
                        <Button onClick={onContinue} color="secondary" label="Continue" icon={faArrowRight} />
                    </div>
                )}
            </div>
        </>
    );

}

export default StepProducts