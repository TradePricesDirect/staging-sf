import { useMemo } from "react";
import { useCustomersQuery } from "../../utils";

import styles from "./UserResults.module.scss";

const UserResults = ({ search, onClick }) => {
  const { data, loading } = useCustomersQuery(search);

  const [customers, numberOfResults] = useMemo(
    () => [
      data?.customers?.edges.map((e) => e.node) || [],
      data?.customers?.totalCount || 0,
    ],
    [data]
  );

  if (!customers.length) return <p>No customers found.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-borderless table-striped align-middle">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th className={styles.shrink}></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td scope="row">
                {customer.firstName} {customer.lastName}
              </td>
              <td>{customer.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onClick(customer.id)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserResults;
