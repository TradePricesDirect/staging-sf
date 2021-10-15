import Money from "components/atoms/Money";
import { useShop } from "contexts/ShopContext";

const TaxedMoney = ({ taxedMoney, gross, net, suffix }) => {
  const { displayGrossPrices } = useShop();

  let money = displayGrossPrices ? taxedMoney.gross : taxedMoney.net;
  if (gross) money = taxedMoney.gross;
  if (net) money = taxedMoney.net;

  return <Money money={money} suffix={suffix} />;
};

export default TaxedMoney;
