import MetaTags from "components/atoms/MetaTags";
import { canDisplay, extractMeta } from "./utils";
import Page from "./Page";
import { convertRichTextToPlainText } from "core/utils";

const ProductPage = ({ product }) => {
  if (!canDisplay(product)) return null;

  return (
    <>
      <MetaTags
        title={product.seoTitle || product.name}
        description={
          product.seoDescription ||
          convertRichTextToPlainText(product.description)
        }
        meta={extractMeta(product)}
      />

      <Page key={product.id} product={product} />
    </>
  );
};

export default ProductPage;
