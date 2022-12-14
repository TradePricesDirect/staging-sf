import Link from "next/link";
import paths from "core/paths";
import Auth, { Separator } from "components/templates/Auth";
import RegisterForm from "components/molecules/RegisterForm";

const RegisterPage = () => {
  return (
    <Auth title="Create an account & <strong>start saving</strong>">
      <RegisterForm />

      <Separator />

      <Link href={paths.login} className="btn btn-outline-primary w-100">
        Sign In
      </Link>
    </Auth>
  );
};

export default RegisterPage;
