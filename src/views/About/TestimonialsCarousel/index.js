import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";

import styles from "./TestimonialsCarousel.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    backgroundImage: "/images/about/testimonial-bg.jpg",
    saved: "Saved £3,850",
    text: "We got the kitchen we’ve always wanted and saved almost £4000 off the price we were quoted by one of the highstreet companies. The whole process was slick from start to finish and we couldn’t be happier with Trade Prices Direct.",
    purchaser: "Jane & John Smith From Leeds",
    purchase: "Kitchen Renovation",
  },
  {
    backgroundImage: "/images/bathrooms/alba-graphite.jpg",
    saved: "Saved £4,850",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque id alias labore deserunt natus, cupiditate facilis odio! Quisquam, nihil dolor.",
    purchaser: "Jane & John Smith From Leeds",
    purchase: "Kitchen Renovation",
  },
  {
    backgroundImage: "/images/bathrooms/alba-white.jpg",
    saved: "Saved £5,850",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque id alias labore deserunt natus, cupiditate facilis odio! Quisquam, nihil dolor.",
    purchaser: "Jane & John Smith From Leeds",
    purchase: "Kitchen Renovation",
  },
];

const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const slide = useMemo(() => slides[activeIndex], [slides, activeIndex]);

  return (
    <div className={styles.wrap}>
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          className={styles.slide}
          initial={{ opacity: 0, position: "absolute", zIndex: 1 }}
          animate={{ opacity: 1, position: "relative", zIndex: 2 }}
          exit={{ opacity: 0, position: "absolute", zIndex: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={slide.backgroundImage}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />

          <div className={styles.ribbon}>
            <span>{slide.saved}</span>
          </div>

          <div className="container">
            <div className={styles.slideContent}>
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

              <blockquote>
                <p>{slide.text}</p>
                <cite>
                  <div className={styles.purchaser}>{slide.purchaser}</div>
                  <div className={styles.purchase}>{slide.purchase}</div>
                </cite>
              </blockquote>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialsCarousel;
