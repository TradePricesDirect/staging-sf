import authRoute from "utils/api/auth";
import {
  deleteWishlist,
  getWishlist,
  updateWishlist,
} from "utils/api/wishlists";

const handler = async (req, res) => {
  if (!req.query.id) {
    res.status(400).end();
    return;
  }

  const id = parseInt(req.query.id);

  let wishlist;

  switch (req.method) {
    // Get a wishlist
    case "GET":
      wishlist = await getWishlist(id, req.user);

      if (!wishlist) {
        res.status(400).end();
      } else {
        res.status(200).json(wishlist);
      }
      break;

    // Update a wishlist
    case "POST":
      wishlist = await updateWishlist(id, req.body);

      res.status(200).json(wishlist);
      break;

    // Delete a wishlist
    case "DELETE":
      await deleteWishlist(id);

      res.status(200).json({});
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authRoute(handler);
