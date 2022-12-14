import Link from "next/link";
import paths from "core/paths";
import { useWishlistsByUser } from "utils/wishlists";
import { formatDateTime } from "utils/date";
import Loader from "components/atoms/Loader";

import styles from "./UserWishlists.module.scss";

const UserWishlists = ({ userId, onReset }) => {
  const { wishlists, loading } = useWishlistsByUser(userId);

  if (loading) return <Loader />;

  return (
    <>
      {wishlists.length ? (
        <div className="table-responsive">
          <table className="table table-borderless table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">No. of Products</th>
                <th scope="col">Date Created</th>
                <th scope="col">Privacy</th>
                <th className={styles.shrink}></th>
              </tr>
            </thead>
            <tbody>
              {wishlists.map((wishlist) => (
                <tr key={wishlist.id}>
                  <td scope="row">{wishlist.name}</td>
                  <td>{wishlist.lines.length}</td>
                  <td>{formatDateTime(wishlist.created_at)}</td>
                  <td>{wishlist.type}</td>
                  <td>
                    <Link href={paths.wishlist.replace("[id]", wishlist.id)} className="btn btn-sm btn-outline-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>This customer has no wishlists</p>
      )}

      <button type="button" onClick={onReset} className="btn btn-primary">
        Go Back
      </button>
    </>
  );
};

export default UserWishlists;
