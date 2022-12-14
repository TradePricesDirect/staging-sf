import Link from "next/link";
import paths from "core/paths";
import MetaTags from "components/atoms/MetaTags";
import PageHero from "components/molecules/PageHero";
import VideoModal from "components/molecules/VideoModal";
import HeroImage from "./trade-hero.svg";
import IconGrid from "./IconGrid";
import GetStarted from "./GetStarted";
import FAQs from "./FAQs";
import Banner from "./Banner";

const TradespersonPage = () => {
  return (
    <>
      <MetaTags
        title="Trade Account"
        description="Register for free and get connected with tens of thousands of customers across the UK looking for reliable tradespeople. Not to mention access to over a million products at trade prices."
      />

      <PageHero
        content={
          <>
            <h3>Boost Your Business</h3>
            <h1>
              Get Unlimited <strong>Leads</strong>
              <br /> For Free
            </h1>

            <p>
              Register for free and get connected with tens of thousands of
              customers across the UK looking for reliable tradespeople. Not to
              mention access to over a million products at trade prices.
            </p>

            <Link href={paths.register} className="btn btn-primary mb-4 me-sm-8 mb-sm-0">
              Register For Free
            </Link>

            <br className="d-block d-sm-none" />

            <VideoModal />
          </>
        }
        image={<HeroImage />}
        imageAlignEnd
      />

      <IconGrid />

      <GetStarted />

      <FAQs />

      <Banner />
    </>
  );
};

export default TradespersonPage;
