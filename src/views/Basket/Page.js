import { useCart, useCheckout } from "@saleor/sdk";
import CartRow from "components/organisms/CartRow";
import CartSummary from "components/molecules/CartSummary";
import CartFinanceBanner from "components/molecules/CartFinanceBanner";

import styles from "./BasketPage.module.scss";

const Page = () => {
  const { checkout } = useCheckout();
  const { items } = useCart();

  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        {items?.map((item) => (
          <CartRow key={item.id} item={item} />
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
