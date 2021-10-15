import { useCart, useCheckout } from "@saleor/sdk";
import CartRow from "components/organisms/CartRow";
import CartSummary from "components/molecules/CartSummary";
import CartFinanceBanner from "components/molecules/CartFinanceBanner";

import styles from "./BasketPage.module.scss";

const Page = () => {
  const { checkout } = useCheckout();
  const { items, removeItem, updateItem } = useCart();

  console.log(items[0]);

  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        {items?.map(({ id, variant, quantity, totalPrice }) => (
          <CartRow
            key={id}
            variant={variant}
            quantity={quantity}
            totalPrice={totalPrice}
            onRemove={() => removeItem(variant.id)}
            onUpdate={(quantity) => updateItem(variant.id, quantity)}
          />
        ))}
      </div>

      <div className="col-12 col-lg-4">
        <div className={styles.sidebar}>
          <CartSummary />

          <CartFinanceBanner />
        </div>
      </div>
    </div>
  );
};

export default Page;
