import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import Money from "components/atoms/Money";
import { useShop } from "contexts/ShopContext";
import paths from "core/paths";

import styles from "./TaxedMoneyProduct.module.scss";

const TaxedMoneyProduct = ({ taxedMoney }) => {
  const { user } = useAuth();

  const { displayGrossPrices } = useShop();

  if (!user)
    return (
      <p className="text-danger">Please login or register to view prices</p>
    );

  return (
    <div className={styles.wrap}>
      <Money money={displayGrossPrices ? taxedMoney.gross : taxedMoney.net} />

      <div className={styles.suffix}>
        <Money
          money={displayGrossPrices ? taxedMoney.net : taxedMoney.gross}
          suffix={displayGrossPrices ? "exc VAT" : "inc VAT"}
        />
      </div>
    </div>
  );
};

export default TaxedMoneyProduct;
