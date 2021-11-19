// import WishlistCard from "components/WishlistCard";
import { useWishlists } from "utils/wishlists";
import Loader from "components/atoms/Loader";
import WishlistTile from "components/molecules/WishlistTile";
import WishlistEmpty from "../WishlistEmpty";
import WishlistCreate from "../WishlistCreate";

import styles from "./WishlistLists.module.scss";

const WishlistLists = () => {
  const { wishlists, loading } = useWishlists();

  if (loading) return <Loader />;

  if (!wishlists.length) return <WishlistEmpty />;

  return (
    <>
      <h2 className="mb-4">My Lists</h2>

      {wishlists.length ? (
        <div className={styles.grid}>
          {wishlists.map((wishlist) => (
            <div key={wishlist.id}>
              <WishlistTile wishlist={wishlist} />
            </div>
          ))}
        </div>
      ) : (
        <p>
          Organise your next home renovation by saving your favourite items to a
          list.
        </p>
      )}

      <WishlistCreate />
    </>
  );
};

export default WishlistLists;
