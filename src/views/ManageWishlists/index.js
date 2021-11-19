import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import paths from "core/paths";
import Page from "./Page";

const ManageWishlistsView = () => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user?.isStaff) {
    router.push(paths.wishlists);
    return null;
  }

  return <Page />;
};

export default ManageWishlistsView;
