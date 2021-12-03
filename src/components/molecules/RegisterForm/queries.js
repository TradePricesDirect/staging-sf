import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useAccountUpdate } from "@saleor/sdk";
import paths from "core/paths";
import { useUpdateMetadataMutation } from "graphql/mutations";

export const useRegisterAccount = () => {
  const router = useRouter();
  const { createAccount } = useCreateAccount();

  const [errorMessage, setErrorMessage] = useState(null);

  const registerAccount = async (formData) => {
    try {
      // Send Quote Email
      await sendAdminEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
      });

      await createAccount(formData);

      router.push(paths.registerNewUser);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return { registerAccount, errorMessage };
};

  const sendAdminEmail = async (data) => {
    try {
      const res = await fetch("/api/new-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw res;
    } catch (error) {
      console.error(error);
    }
  };

export const useCreateAccount = () => {
  const auth = useAuth();
  const [setAccountUpdate] = useAccountUpdate();
  const [setMetadata] = useUpdateMetadataMutation();

  const createAccount = async (formData) => {
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
  };

  return { createAccount };
};
