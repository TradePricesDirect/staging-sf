import { convertRichTextToPlainText } from "core/utils";

export const productStructuredData = (product) => {
  const images = product.images.map((image) => new URL(image.url).pathname);
  const { variants } = product;

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    description: !product.seoDescription
      ? `${convertRichTextToPlainText(product.description)}`
      : `${product.seoDescription}`,
    image: images,
    name: !product.seoTitle ? `${product.name}` : `${product.seoTitle}`,
    offers: getVariantsStructuredData(variants),
    url: location.href,
  });
};

const getVariantsStructuredData = (variants) => {
  const inStock = "https://schema.org/InStock";
  const outOfStock = "https://schema.org/OutOfStock";
  return variants.map((variant) => ({
    "@type": "Offer",
    availability: variant.quantityAvailable > 0 ? inStock : outOfStock,
    itemCondition: "https://schema.org/NewCondition",
    price: variant.pricing.price.gross.amount.toFixed(2),
    priceCurrency: variant.pricing.price.gross.currency,
    sku: variant.sku,
  }));
};
