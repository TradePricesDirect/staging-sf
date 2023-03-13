import Money from "components/atoms/Money";
import { useShop } from "contexts/ShopContext";
import { FC } from "react";

const TaxedMoney: FC<{
  taxedMoney: any;
  gross?: boolean;
  net?: any;
  suffix?: string;
}> = ({ taxedMoney, gross, net, suffix }) => {
  const { displayGrossPrices } = useShop();

  let money = displayGrossPrices ? taxedMoney.gross : taxedMoney.net;
  if (gross) money = taxedMoney.gross;
  if (net) money = taxedMoney.net;

  return <Money money={money} suffix={suffix} />;
};

export default TaxedMoney;
