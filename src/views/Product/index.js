import { useCart } from "@saleor/sdk";
import MetaTags from "components/atoms/MetaTags";
import { canDisplay, extractMeta } from "./utils";
import Page from "./Page";

const ProductPage = ({ product }) => {
  const { addItem, items } = useCart();

  if (!canDisplay(product)) return null;

  return (
    <>
      <MetaTags
        title={product.seoTitle || product.name}
        description={product.seoDescription || product.description}
        meta={extractMeta(product)}
      />

      <Page product={product} onAdd={addItem} items={items} />
    </>
  );
};

export default ProductPage;
