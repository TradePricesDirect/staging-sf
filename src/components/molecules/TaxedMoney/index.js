import Money from "components/atoms/Money";
import { useShop } from "contexts/ShopContext";

import styles from "./TaxedMoney.module.scss";

const TaxedMoney = ({ taxedMoney }) => {
  const { displayGrossPrices } = useShop();

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

export default TaxedMoney;
