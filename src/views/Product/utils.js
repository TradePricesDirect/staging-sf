export const canDisplay = (product) => {
  return !!product?.name && !!product?.pricing && !!product?.variants;
};

export const getActiveVariant = (product, variantId) => {
  if (!variantId) return null;

  return product.variants.find((v) => v.id === variantId);
};

export const extractMeta = (product) => {
  return {
    "og:type": "product.item",
    "og:url": window.location.href,
    "og:image": product?.thumbnail?.url || null,
    "product:price:amount":
      product.pricing?.priceRange?.start?.gross.amount.toString(),
    "product:price:currency":
      product.pricing?.priceRange?.start?.gross.currency,
    "product:isAvailable": product.isAvailable ? "in stock" : "out off stock",
    "product:category": product.category?.name,
  };
};

export const getImages = (product, variantId) => {
  if (product.variants && variantId) {
    const variant = product.variants.find((v) => v.id === variantId);

    if (variant?.images.length > 0) return variant.images;
  }

  return product.images;
};

export const getRelatedProducts = (category, currentProductId) => {
  const products = category.products?.edges?.map(({ node }) => node) || [];

  return products.filter((product) => product.id !== currentProductId);
};
