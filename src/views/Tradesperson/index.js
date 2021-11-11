import Link from "next/link";
import paths from "core/paths";
import PageHero from "components/molecules/PageHero";
import HeroImage from "./trade-hero.svg";
import IconGrid from "./IconGrid";
import GetStarted from "./GetStarted";
import FAQs from "./FAQs";
import Banner from "./Banner";

const TradespersonPage = () => {
  return (
    <>
      <PageHero
        content={
          <>
            <h3>Pre title</h3>
            <h1>
              Get Unlimited <strong>Leads</strong>
              <br /> For Free
            </h1>

            <p>
              Register for free and get connected with tens of thousands of
              customers across the UK looking for reliable tradespeople. Not to
              mention access to over a million products at trade prices.
            </p>

            <Link href={paths.register}>
              <a className="btn btn-primary">Register For Free</a>
            </Link>
          </>
        }
        image={<HeroImage />}
      />

      <IconGrid />

      <GetStarted />

      <FAQs />

      <Banner />
    </>
  );
};

export default TradespersonPage;
