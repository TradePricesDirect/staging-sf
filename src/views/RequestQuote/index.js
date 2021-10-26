import { useMemo } from "react";
import QuoteLayout from "layouts/Quote";
import useQuoteForm, { QuoteStepEnum } from "./utils";
import StepProgressBar from "./components/StepProgressBar";
import FooterBrands from "./components/FooterBrands";
import FooterIcons from "./components/FooterIcons";
import StepType from "./steps/StepType";
import StepTimeframe from "./steps/StepTimeframe";
import StepFinance from "./steps/StepFinance";
import StepDetails from "./steps/StepDetails";

import styles from "./RequestQuote.module.scss";

const RequestQuotePage = ({ totalCounts }) => {
  const { step, maxStep, state, actions } = useQuoteForm();

  const CurrentStep = useMemo(() => {
    switch (step) {
      case QuoteStepEnum.Type:
        return (
          <StepType
            selected={state.type}
            onChange={actions.handleInputChange}
          />
        );
      case QuoteStepEnum.Timeframe:
        return (
          <StepTimeframe
            selected={state.timeframe}
            onChange={actions.handleInputChange}
          />
        );
      case QuoteStepEnum.Finance:
        return (
          <StepFinance
            selected={state.finance}
            onChange={actions.handleInputChange}
          />
        );
      case QuoteStepEnum.Details:
        return <StepDetails onSubmit={actions.handleSubmit} />;
    }
  }, [step]);

  return (
    <section className={styles.wrap}>
      <div className={styles.body}>
        <StepProgressBar
          step={step}
          maxStep={maxStep}
          onClick={actions.handleStepChange}
        />

        {CurrentStep}
      </div>
      <footer className={styles.footer}>
        {step === 4 ? (
          <FooterBrands totalCounts={totalCounts} />
        ) : (
          <FooterIcons key={`step-${step}`} />
        )}
      </footer>
    </section>
  );
};

RequestQuotePage.getLayout = (page) => <QuoteLayout>{page}</QuoteLayout>;

export default RequestQuotePage;
