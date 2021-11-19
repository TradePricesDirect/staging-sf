import { customerSearchQuery, useTypedQuery } from "graphql/queries";

export const useCustomersQuery = (search) => {
  return useTypedQuery(customerSearchQuery, {
    variables: { search },
    fetchPolicy: "cache-and-network",
  });
};
