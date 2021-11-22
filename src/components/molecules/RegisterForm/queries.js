import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useAccountUpdate } from "@saleor/sdk";
import paths from "core/paths";
import { useUpdateMetadataMutation } from "graphql/mutations";

export const useRegisterAccount = () => {
  const router = useRouter();
  const auth = useAuth();
  const [setAccountUpdate] = useAccountUpdate();
  const [setMetadata] = useUpdateMetadataMutation();

  const [errorMessage, setErrorMessage] = useState(null);

  const registerAccount = async (formData) => {
    try {
      // Register Account
      const { email, password, firstName, lastName, ...data } = formData;

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
      setAccountUpdate({ input: { firstName, lastName } });

      // Update Account Metadata
      await setMetadata({
        variables: {
          id: auth.user.id,
          input: Object.keys(data).map((key) => ({
            key,
            value: data[key],
          })),
        },
      });

      router.push(paths.registerNewUser);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return { registerAccount, errorMessage };
};
