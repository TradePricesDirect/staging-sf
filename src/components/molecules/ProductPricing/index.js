// import { isEqual } from "lodash";
import TaxedMoneyProduct from "components/molecules/TaxedMoneyProduct";

const ProductPricing = ({ variantPricing, productPricing }) => {
  if (variantPricing) {
    return <TaxedMoneyProduct taxedMoney={variantPricing.price} />;

    // TODO: The below can display discounted prices nicely
    // if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
    //   return <TaxedMoneyProduct taxedMoney={variantPricing.price} />;
    // }

    // return (
    //   <>
    //     <TaxedMoneyProduct taxedMoney={variantPricing.priceUndiscounted} />
    //     <TaxedMoneyProduct taxedMoney={variantPricing.price} />
    //   </>
    // );
  }

  if (!productPricing.priceRange) return null;

  const { start, stop } = productPricing.priceRange;

  return <TaxedMoneyProduct taxedMoney={start} />;

  // TODO: The below can display price range
  // if (isEqual(start, stop)) return <TaxedMoneyProduct taxedMoney={start} />;

  // return (
  //   <>
  //     <TaxedMoneyProduct taxedMoney={start} /> - <TaxedMoneyProduct taxedMoney={stop} />
  //   </>
  // );
};

export default ProductPricing;
