import authRoute from "utils/api/auth";
import { addWishlistProduct, removeWishlistProduct } from "utils/api/wishlists";

const handler = async (req, res) => {
  if (!req.query.id) {
    res.status(400).end();
    return;
  }

  const id = parseInt(req.query.id);

  let wishlist;

  switch (req.method) {
    case "POST":
      const { method, products } = req.body;

      if (method === "add") {
        wishlist = await addWishlistProduct(id, products);
      } else if (method === "remove") {
        wishlist = await removeWishlistProduct(id, products);
      } else {
        res.status(400).end();
        return;
      }

      res.status(200).json(wishlist);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authRoute(handler);
