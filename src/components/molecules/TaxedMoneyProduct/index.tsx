import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import Money from "components/atoms/Money";
import { useShop } from "contexts/ShopContext";
import paths from "core/paths";

import styles from "./TaxedMoneyProduct.module.scss";
import { FC } from "react";

const TaxedMoneyProduct: FC<{
  taxedMoney: any;
  financePromo?: boolean;
}> = ({ taxedMoney, financePromo }) => {
  const { user } = useAuth();

  const { displayGrossPrices } = useShop();

  const payInThreeAmount = {
    net: taxedMoney.net.amount / 3,
    gross: taxedMoney.gross.amount / 3,
  };

  if (!user)
    return (
      // <p className="text-danger">Please login or register to view prices</p>
      <></>
    );

  return (
    <div className={styles.wrap}>
      <Money money={displayGrossPrices ? taxedMoney.gross : taxedMoney.net} />

      <div className={styles.suffix}>
        <Money
          money={displayGrossPrices ? taxedMoney.net : taxedMoney.gross}
          suffix={displayGrossPrices ? "exc VAT" : "inc VAT"}
        />
        {financePromo && (
          <Money
            money={
              displayGrossPrices
                ? { ...taxedMoney.gross, amount: payInThreeAmount.gross }
                : { ...taxedMoney.net, amount: payInThreeAmount.net }
            }
            prefix={`From `}
            suffix={` a month*`}
          />
        )}
      </div>
    </div>
  );
};

export default TaxedMoneyProduct;
