import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { useRouter } from "next/router";
import paths from "core/paths";
import Loader from "components/atoms/Loader";

const BasketPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { checkout } = useCheckout();
  console.log(checkout);

  const cart = useCart();
  console.log(cart);

  const {
    loaded,
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
  } = useCart();

  if (!user) {
    router.push(paths.home);
    return null;
  }

  if (!loaded) return <Loader />;

  return (
    <div className="container">
      <h1>Basket Page</h1>

      <p>Cool stuff will go here...</p>
    </div>
  );
};

export default BasketPage;
