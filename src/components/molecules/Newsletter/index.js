import Link from "next/link";
import { useForm } from "react-hook-form";
import paths from "core/paths";

import styles from "./Newsletter.module.scss";
import SubmitButton from "components/atoms/SubmitButton";
import clsx from "clsx";
import Alert from "components/atoms/Alert";

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm();

  const onSubmit = async ({ email }) => {
    await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };

  const privacyPolicy = (
    <Link href={paths.privacy}>
      <a>Privacy Policy</a>
    </Link>
  );

  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>Subscribe for even more deals</h4>

      {isSubmitSuccessful ? (
        <Alert type="success">
          Thank you for subscribing to our newsletter.
        </Alert>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <input
              type="email"
              placeholder="Email address"
              className={clsx("form-control", errors.email && "is-invalid")}
              {...register("email", { required: true })}
            />

            <SubmitButton loading={isSubmitting}>Subscribe</SubmitButton>
          </div>
        </form>
      )}

      <small className={styles.disclaimer}>
        By subscribing you agree to be contacted inline with our {privacyPolicy}
        .
      </small>
    </div>
  );
}
