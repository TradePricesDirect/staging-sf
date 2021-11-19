import { useMemo } from "react";
import { useCart } from "@saleor/sdk";
import { groupCartItems } from "utils/cart";
import CartRangeRow from "components/organisms/CartRangeRow";
import CartRow from "components/organisms/CartRow";
import CartSummary from "components/molecules/CartSummary";
import CartFinanceBanner from "components/molecules/CartFinanceBanner";

import styles from "./BasketPage.module.scss";

const Page = () => {
  const { items: cartItems, removeItem, removeItems, updateItem } = useCart();

  const { items, ranges } = useMemo(
    () => groupCartItems(cartItems),
    [cartItems]
  );

  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        {ranges.map((range, index) => (
          <CartRangeRow
            key={`cart-row-${index}-${range.id}`}
            range={range}
            onRemove={removeItem}
            onRemoveAll={removeItems}
          />
        ))}

        {items?.map(({ variant, quantity, totalPrice }, index) => (
          <CartRow
            key={`cart-row-${index}-${variant.id}`}
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
