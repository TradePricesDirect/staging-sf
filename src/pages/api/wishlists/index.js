import authRoute from "utils/api/auth";
import { getWishlists, createWishlist } from "utils/api/wishlists";

const handler = async (req, res) => {
  const { user } = req;

  switch (req.method) {
    // Get all wishlists for user
    case "GET":
      if (!user) {
        res.status(400).end();
        return;
      }

      const userId =
        user.is_staff && req.query.userId ? req.query.userId : user.user_id;

      const wishlists = await getWishlists(userId);

      res.status(200).json(wishlists);
      break;

    // Create a wishlist
    case "POST":
      if (!user) {
        res.status(400).end();
        return;
      }

      const wishlist = await createWishlist({
        ...req.body,
        user_id: user.user_id,
      });

      res.status(200).json(wishlist);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authRoute(handler);
