import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-solid-svg-icons";

import styles from "./TestimonialsCarousel.module.scss";

const slides = [
  {
    backgroundImage: "/images/about/testimonial-1-bg.jpg",
    saved: "Saved £1,450",
    title: "We Recommend Trade Prices Direct - Unbeatable Prices",
    text: (
      <>
        <p>
          We received quotes from Wren for our kitchen and Victorian plumbing
          for the bathroom and after looking at various companies came across
          Trade Prices Direct and spoke to a lovely chap called Jason who was
          excellent every step of the way. He provided us with a quote that was
          a fraction of the price.
        </p>
        <p>
          I'm overwhelmed at the level of service I received and would
          definitely be recommending this company. Thanks for all your help! We
          will finally have the kitchen and bathroom sorted in time for
          Christmas.
        </p>
        <p>
          Impeccable service from all at TradePricesDirect, from initial contact
          with myself and my customers to discussing products and ensuring
          correct items are purchased at an affordable price.
        </p>
      </>
    ),
    purchaser: "Peter - Online Customer",
    purchase: "Bathroom Renovation",
    class: styles.large,
  },
  {
    backgroundImage: "/images/about/testimonial-3-bg.jpg",
    saved: "Saved £595",
    title: "Brand New Boiler from Trade Prices Direct",
    text: (
      <>
        <p>
          Had our Worcester Bosch boiler installed Feb 2020. Craig from Trades
          Prices Direct talked through the options and advised us on the best
          boiler for our property. The installation was arranged quickly and the
          whole process from start to finish was smooth and stress free.
        </p>

        <p>
          Would highly recommend Trade Prices Direct and thank Craig for his
          fantastic customer service.
        </p>
      </>
    ),
    purchaser: "Kerry - Online Customer",
    purchase: "New Boiler",
  },
  {
    backgroundImage: "/images/about/testimonial-2-bg.jpg",
    saved: "Saved £1,799",
    title: "Over the Moon with Trade Prices Direct",
    text: (
      <>
        <p>
          Ordered my bathroom suite Friday and was delivered Tuesday as
          promised. Can't fault the service at all.
        </p>
        <p>Loving my new bathroom suite.</p>
      </>
    ),
    purchaser: "Kim - Online Customer",
    purchase: "Bathroom Renovation",
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
            <div className={clsx(styles.slideContent, slide?.class)}>
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
                {slide.title && <h5>{slide.title}</h5>}

                {slide.text}
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
