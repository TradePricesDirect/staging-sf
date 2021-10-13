import { useCart } from "@saleor/sdk";

const AddToCartSection = () => {
  const { addItem, items } = useCart();

  return <h1>Add TO CART</h1>;
};

export default AddToCartSection;
