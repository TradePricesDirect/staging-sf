import { useMemo } from "react";
import QuoteLayout from "layouts/Quote";
import useQuoteForm, { QuoteStepEnum } from "./utils";
import StepProgressBar from "./components/StepProgressBar";
import FooterBrands from "./components/FooterBrands";
import FooterIcons from "./components/FooterIcons";
import StepProducts from "./steps/StepProducts";
import StepType from "./steps/StepType";
import StepTimeframe from "./steps/StepTimeframe";
import StepFinance from "./steps/StepFinance";
import StepDetails from "./steps/StepDetails";

import styles from "./RequestQuote.module.scss";

const RequestQuotePage = ({ totalCounts, categories, featuredCategories }) => {
  const { step, maxStep, state, actions, selectedProducts } = useQuoteForm();

  const CurrentStep = useMemo(() => {
    switch (step) {
      case QuoteStepEnum.Products:
        return (
          <StepProducts
            featuredCategories={featuredCategories}
            categories={categories}
            selectedProducts={selectedProducts}
            state={state}
            onChange={actions.handleProductSelection}
            onContinue={actions.handleStepProgress}
          />
        );
      case QuoteStepEnum.Type:
        return (
          <StepType
            selected={state.type}
            onChange={actions.handleInputChange}
            onContinue={actions.handleStepProgress}
          />
        );
      case QuoteStepEnum.Finance:
        return (
          <StepFinance
            selected={state.finance}
            onChange={actions.handleInputChange}
            onContinue={actions.handleStepProgress}
          />
        );
      case QuoteStepEnum.Details:
        return <StepDetails onSubmit={actions.handleSubmit} handleBack={actions.handleStepPrevious} />;
    }
  }, [step]);

  return (
    <section className={styles.wrap}>
      <div className={styles.body}>
        <StepProgressBar
          step={step}
          onClick={actions.handleStepChange}
          onPrevious={actions.handleStepPrevious}
        />
      </div>
      {CurrentStep}
    </section>
  );
};

RequestQuotePage.getLayout = (page) => <QuoteLayout>{page}</QuoteLayout>;

export default RequestQuotePage;
