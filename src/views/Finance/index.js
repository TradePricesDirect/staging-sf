import MetaTags from "components/atoms/MetaTags";
import PageHero from "components/molecules/PageHero";
import HeroImage from "./finance-hero.svg";
import Intro from "./Intro";
import HowItWorks from "./HowItWorks";
import Calculator from "./Calculator";
import FAQs from "./FAQs";
import Banner from "./Banner";

const FinancePage = () => {
  return (
    <>
      <MetaTags
        title="Affordable Finance Options"
        description="Spread the cost of your dream home with affordable financing from Propensio or Klarna."
      />

      <PageHero
        content={
          <>
            <h1>
              <strong>Affordable</strong> Finance Options
            </h1>

            <p>
              Spread the cost of your dream home with affordable financing from
              Propensio or Klarna.
            </p>
          </>
        }
        image={<HeroImage />}
      />

      <Intro />

      <HowItWorks />

      <Calculator />

      <FAQs />

      <Banner />
    </>
  );
};

export default FinancePage;
