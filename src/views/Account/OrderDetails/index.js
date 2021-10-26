import { useRouter } from "next/router";
import { useQuery } from "react-apollo";
import { orderDetailsByTokenQuery } from "graphql/queries";
import paths from "core/paths";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import Loader from "components/atoms/Loader";
import Page from "./Page";

const AccountOrderDetails = ({ token }) => {
  const { push } = useRouter();

  const { data, loading } = useQuery(orderDetailsByTokenQuery, {
    variables: { token },
    fetchPolicy: "cache-first",
  });

  const order = data?.orderByToken;

  if (!loading && !order) push(paths.account.orders);

  const isLoading = !order || loading;

  return (
    <Account>
      <>{isLoading ? <Loader /> : <Page order={order} />}</>
    </Account>
  );
};

export default withAuth(AccountOrderDetails);
