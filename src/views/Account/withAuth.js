import { useRouter } from "next/router";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import Loader from "components/atoms/Loader";

const withAuth = (WrappedComponent) => (props) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push(paths.login);
    return <Loader />;
  }

  return <WrappedComponent {...props} />;
};

export default withAuth;
