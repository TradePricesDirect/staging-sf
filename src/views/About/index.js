import Link from "next/link";
import paths from "core/paths";
import MetaTags from "components/atoms/MetaTags";
import PageHero from "components/molecules/PageHero";
import VideoModal from "components/molecules/VideoModal";
import HeroImage from "./about-hero.svg";
import { FeefoReviewsWidget } from "components/molecules/FeefoReviews";
import TestimonialsCarousel from "./TestimonialsCarousel";
import AboutSteps from "./AboutSteps";
import CallToAction from "./CallToAction";

import styles from "./AboutPage.module.scss";

const AboutPage = () => {
  return (
    <>
      <MetaTags
        title="Affordable Finance Options"
        description="Spread the cost of your dream home with affordable financing from Propensio or Klarna."
      />

      <PageHero
        content={
          <>
            <h3>About Us</h3>
            <h1>
              How Trade Prices Direct <strong>Works</strong>
            </h1>

            <p>
              {`With prices so low, we wouldn’t blame you for thinking, 'it's too
              good to be true.' So let us explain how we cut out the middleman
              and pass the savings onto you!`}
            </p>

            <Link href={paths.register} className="btn btn-primary mb-4 me-sm-8 mb-sm-0">
              Register Now
            </Link>

            <br className="d-block d-sm-none" />

            <VideoModal />
          </>
        }
        image={<HeroImage />}
        imageAlignEnd
        imageSmall
      />

      <AboutSteps />

      <div className={styles.feefoWrap}>
        <FeefoReviewsWidget />
      </div>

      <TestimonialsCarousel />

      <CallToAction />
    </>
  );
};

export default AboutPage;
