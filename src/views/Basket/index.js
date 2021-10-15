import { useAuth, useCart } from "@saleor/sdk";
import { useRouter } from "next/router";
import paths from "core/paths";
import Loader from "components/atoms/Loader";
import Empty from "./Empty";
import Page from "./Page";

const BasketPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { loaded, items } = useCart();

  if (!user) {
    router.push(paths.home);
    return null;
  }

  if (!loaded) return <Loader />;

  return (
    <div className="container py-4">{items?.length ? <Page /> : <Empty />}</div>
  );
};

export default BasketPage;
