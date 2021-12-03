import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import { useCreateAccount } from "components/molecules/RegisterForm/queries";

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
  const { user } = useAuth();

  const { push } = useRouter();
  const { createAccount } = useCreateAccount();

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

      // Send Quote Email
      await sendQuoteEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      });

      // Create Account
      if (!user) await createAccount(data);

      push(paths.requestQuoteThankYou);
    } catch (error) {
      console.error(error);
    }
  };

  const sendQuoteEmail = async (data) => {
    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...state, ...data }),
      });

      if (!res.ok) throw res;
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
