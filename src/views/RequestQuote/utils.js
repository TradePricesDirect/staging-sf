import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import { useCreateAccount } from "components/molecules/RegisterForm/queries";

export const QuoteStepEnum = {
  Products: 0,
  Type: 1,
  Finance: 2,
  Details: 3,
};

const initialState = {
  type: null,
  finance: null,
};

export default function useQuoteForm() {
  const { user } = useAuth();

  const { push } = useRouter();
  const { createAccount } = useCreateAccount();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(QuoteStepEnum.Products);

  const [state, setState] = useState(initialState);
  const [selectedProducts, setSelectedProducts] = useState([])

  const handleStepChange = (step) => setStep(step);

  const handleProductSelection = (selectedProducts) => {
    setSelectedProducts(selectedProducts)
  }

  const handleStepProgress = () => {
    setStep(step + 1);
  }

  const handleStepPrevious = () => {
    setStep(step - 1);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });

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
        body: JSON.stringify({ ...{ products: selectedProducts }, ...state, ...data }),
      });

      if (!res.ok) throw res;
    } catch (error) {
      console.error(error);
    }
  };

  const actions = {
    handleStepChange,
    handleInputChange,
    handleSubmit,
    handleProductSelection,
    handleStepProgress,
    handleStepPrevious
  };

  return { step, loading, state, actions, selectedProducts };
}

