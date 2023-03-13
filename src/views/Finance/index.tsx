import React from "react";
import Link from "next/link";
import paths from "../../core/paths";
import MetaTags from "../../components/atoms/MetaTags";
import PageHero from "../../components/molecules/PageHero";
import VideoModal from "../../components/molecules/VideoModal";
import Intro from "./Intro";
import HowItWorks from "./HowItWorks";
import Calculator from "./Calculator";
import FAQ from "./FAQ";
import Banner from "./Banner";
import Accordion from "../../components/molecules/Accordion";
import Grid from "views/Home/Grid";
import HowItWorksGridTile from "views/Home/HowItWorksGridTile/HowItWorksGridTile";
import FinanceGridTile from "components/molecules/FinanceGridTile/FinanceGridTile";

const FinancePage = () => {
  return (
    <section>
      <MetaTags
        title="Affordable Finance Options"
        description="Spread the cost of your dream home with affordable financing from Propensio or Klarna."
        meta={""}
      />

      <Grid cols={4} height={200}>
        <FinanceGridTile
          header={"Klarna"}
          subHeader={
            "Pay in full up to 30 days later, or split the cost into 3 interest-free monthly instalments."
          }
          min={30}
          max={1000}
          path={""}
          image={""}
        />
        <FinanceGridTile
          header={"Clearpay"}
          subHeader={"Pay in 4 interest-free instalments over six weeks."}
          min={30}
          max={1000}
          path={""}
          image={""}
        />
        <FinanceGridTile
          header={"Kandoo"}
          subHeader={
            "Discuss your favourite kitchen ranges with our designers."
          }
          path={""}
          image={""}
        />
        <FinanceGridTile
          header={"Propensio"}
          subHeader={"Borrow up to £25,000 with zero deposit over 10 years."}
          min={1000}
          max={1000}
          path={""}
          image={""}
        />
      </Grid>

      <Grid
        header={"How Finance Works"}
        subHeader={
          "TPD is the only place you'll get finance on materials and labour under one roof."
        }
        cols={3}
        height={100}
      >
        <HowItWorksGridTile
          header={"Select Propensio at Checkout"}
          subHeader={"For purchases between £1,000 and £25,000."}
          step
          index={0}
        />
        <HowItWorksGridTile
          header={"Quick Online Application"}
          subHeader={
            "Fill in the online finance application, and we'll be in touch within a few hours."
          }
          step
          index={1}
        />
        <HowItWorksGridTile
          header={"Make Affordable Payments"}
          subHeader={
            "Once everything is arranged you'll be charged an affordable monthly payment."
          }
          step
          index={2}
        />
      </Grid>

      {/* <Calculator />

      <FAQ>
        <Accordion title="How do I make monthly Payments?" open>
          <p>
            {`You'll never have to worry about missing a payment as the team at
            Propensio Finance Limited will help you arrange pre-authorised
            payments via your bank account or debit card.`}
          </p>
        </Accordion>

        <Accordion title="Are there any limits on how much I can spend?">
          <p>
            {`Yes, payment plans are available on purchases between £1,000 to
            £25,000 from Propensio Finance Limited. With 6-month deferred
            interest free and up to 3-years 0% financing available.`}
          </p>

          <p>
            {`Klarna Bank AB (publ) offers payment plans on purchases on orders up
            to £1,000.00 and are not regulated by the FCA.`}
          </p>
        </Accordion>

        <Accordion title="Can I request delivery to an address other than my home address?">
          <p>
            {`In adherence with FCA guidelines designed to protect against
            fraudulent applications, we only deliver goods to your home address.`}
          </p>
        </Accordion>

        <Accordion title="What happens to my loan if I want to return my order?">
          <p>
            {`In the unlikely event you're not satisfied with your purchase, you
            can return it within 7 days from delivery. We will notify the lender
            to reduce your loan amount accordingly. Once we have received the
            goods you will receive a notification from our lender confirming the
            cancellation of your application.`}
          </p>
        </Accordion>

        <Accordion title="Who am I borrowing from?">
          <p>Our lenders are:</p>

          <p>
            <strong>Propensio Finance Limited</strong> (for purchases £1,000.00
            - £25,000.00)
          </p>

          <p>Authorised and regulated by the Financial Conduct Authority.</p>

          <p className="m-0">
            <strong>Business registered address:</strong>
          </p>

          <address>
            39-43 Bridge Street, <br />
            Swinton, <br />
            Mexborough, <br />
            South Yorkshire, <br />
            S64 8AP
          </address>

          <p>FCA register No. 806409</p>

          <hr />

          <p>
            <strong>Klarna Bank AB (publ)</strong> (for purchases up to
            £1,000.00)
          </p>

          <p className="m-0">
            <strong>Business registered address:</strong>
          </p>

          <address>
            Sveavägen 46, <br />
            111 34 Stockholm, <br />
            Sweden.
          </address>

          <p>Organisation No: 556737-0431.</p>
        </Accordion>
      </FAQ> */}
    </section>
  );
};

export default FinancePage;
