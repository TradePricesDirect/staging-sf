import { useState } from "react";
import { useRouter } from "next/router";
import paths from "core/paths";

export const QuoteStepEnum = {
  Type: 1,
  Timeframe: 2,
  Finance: 3,
  Details: 4,
};

const initialState = {
  type: null,
  timeframe: null,
  finance: null,
};

export default function useQuoteForm() {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(QuoteStepEnum.Type);

  const [state, setState] = useState(initialState);

  const handleStepChange = (step) => setStep(step);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });

    setStep(step + 1);
  };

  const handleSubmit = async (data) => {
    try {
      if (loading) return;

      setLoading(true);

      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state, ...data }),
      });

      if (!res.ok) throw res;

      push(paths.requestQuoteThankYou);
    } catch (error) {
      console.error(error);
    }
  };

  const maxStep = getMaxStep(state);

  const actions = {
    handleStepChange,
    handleInputChange,
    handleSubmit,
  };

  return { step, maxStep, loading, state, actions };
}

const getMaxStep = (data) => {
  let step = 1;

  if (data.type) {
    step = 2;

    if (data.timeframe) {
      step = 3;

      if (data.finance) {
        step = 4;
      }
    }
  }

  return step;
};
