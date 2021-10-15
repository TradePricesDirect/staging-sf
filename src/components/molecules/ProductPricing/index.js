// import { isEqual } from "lodash";
import TaxedMoney from "components/molecules/TaxedMoney";

const ProductPricing = ({ variantPricing, productPricing }) => {
  if (variantPricing) {
    return <TaxedMoney taxedMoney={variantPricing.price} />;

    // TODO: The below can display discounted prices nicely
    // if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
    //   return <TaxedMoney taxedMoney={variantPricing.price} />;
    // }

    // return (
    //   <>
    //     <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
    //     <TaxedMoney taxedMoney={variantPricing.price} />
    //   </>
    // );
  }

  if (!productPricing.priceRange) return null;

  const { start, stop } = productPricing.priceRange;

  return <TaxedMoney taxedMoney={start} />;

  // TODO: The below can display price range
  // if (isEqual(start, stop)) return <TaxedMoney taxedMoney={start} />;

  // return (
  //   <>
  //     <TaxedMoney taxedMoney={start} /> - <TaxedMoney taxedMoney={stop} />
  //   </>
  // );
};

export default ProductPricing;
