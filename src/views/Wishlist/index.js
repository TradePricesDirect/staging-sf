import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import WishlistGuest from "./components/WishlistGuest";
import WishlistLists from "./components/WishlistLists";

const WishlistView = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      {user ? <WishlistLists /> : <WishlistGuest />}

      {user?.isStaff && (
        <>
          <hr />

          <Link href={paths.wishlistsManage} className="btn btn-outline-primary">
            Search Wishlists
          </Link>
        </>
      )}
    </div>
  );
};

export default WishlistView;
