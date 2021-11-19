import { useRouter } from "next/router";
import paths from "core/paths";
import Loader from "components/atoms/Loader";
import Page from "./Page";
import { useWishlist } from "utils/wishlists";

const WishlistListView = () => {
  const router = useRouter();

  const { wishlist, loading } = useWishlist(router.query.id);

  if (loading) return <Loader />;

  if (!wishlist) {
    router.push(paths.wishlists);
    return null;
  }

  return (
    <div className="container py-4">
      <Page wishlist={wishlist} />
    </div>
  );
};

export default WishlistListView;
