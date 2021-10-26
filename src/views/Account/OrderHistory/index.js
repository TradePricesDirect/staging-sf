import { useOrdersByUser } from "@saleor/sdk";
import withAuth from "../withAuth";
import Account from "components/templates/Account";
import Box from "components/organisms/Box";
import OrderTable from "components/molecules/OrderTable";
import Loader from "components/atoms/Loader";
import SubmitButton from "components/atoms/SubmitButton";

import styles from "./OrderHistory.module.scss";

const ORDERS_PER_API_CALL = 20;

const AccountOrderHistory = () => {
  const { data, loading, loadMore } = useOrdersByUser(
    { perPage: ORDERS_PER_API_CALL },
    { fetchPolicy: "network-only" }
  );

  return (
    <Account>
      <h1 className={styles.title}>Order History</h1>

      <Box className="mb-4">
        {loading && !data ? (
          <Loader />
        ) : (
          <>
            <OrderTable orders={data?.edges.map((e) => e.node) || []} />

            {data?.pageInfo.hasNextPage && (
              <div className="text-center">
                <SubmitButton
                  type="button"
                  onClick={() => {
                    loadMore({
                      after: data.pageInfo.endCursor,
                      perPage: ORDERS_PER_API_CALL,
                    });
                  }}
                  loading={loading}
                >
                  Load More
                </SubmitButton>
              </div>
            )}
          </>
        )}
      </Box>
    </Account>
  );
};

export default withAuth(AccountOrderHistory);
