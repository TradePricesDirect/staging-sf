import paths from "core/paths";
import Auth, { Separator } from "components/templates/Auth";
import RegisterForm from "components/molecules/RegisterForm";
import Button from "components/atoms/Button";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";

const RegisterPage = () => {
  return (
    <Auth title="Create an account & <strong>start saving</strong>">
      <RegisterForm />

      <Separator />

      <Button path={paths.login} label="Sign In"/>
    </Auth>
  );
};

export default RegisterPage;
