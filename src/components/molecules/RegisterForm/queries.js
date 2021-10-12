import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useAccountUpdate } from "@saleor/sdk";
import paths from "core/paths";

export const useRegisterAccount = () => {
  const router = useRouter();
  const auth = useAuth();
  const [setAccountUpdate] = useAccountUpdate();

  const [errorMessage, setErrorMessage] = useState(null);

  const registerAccount = async (formData) => {
    try {
      // Register Account
      const { email, password } = formData;
      const redirectUrl = `${location.origin}${paths.accountConfirm}`;

      const { dataError: registerError } = await auth.registerAccount(
        email,
        password,
        redirectUrl
      );
      if (registerError?.error) throw registerError.error[0];

      // Sign in
      const { dataError: signInError } = await auth.signIn(email, password);
      if (signInError?.error) throw signInError.error[0];

      // Update Account Details
      const { firstName, lastName } = formData;
      setAccountUpdate({ input: { firstName, lastName } });

      router.push(paths.registerNewUser);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return { registerAccount, errorMessage };
};
