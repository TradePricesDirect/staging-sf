import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import Auth, { Separator } from "components/templates/Auth";
import LoginForm from "components/molecules/LoginForm";
import Button from "components/atoms/Button";
import paths from "core/paths";

const LoginPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push("/account");
    return null;
  }

  return (
    <Auth title="Login for exclusive <strong>trade prices</strong>">
      <LoginForm />

      <p className="mt-4 text-muted">
        Forgotten your password?{" "}
        <Link href={paths.forgotPassword}>
          Click Here
        </Link>
      </p>

      <Separator />

      <Button label="Create an account" path={paths.register} />
    </Auth>
  );
};

export default LoginPage;
