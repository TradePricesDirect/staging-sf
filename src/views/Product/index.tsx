import MetaTags from "components/atoms/MetaTags";
import {
  canDisplay,
  extractMeta,
  getActiveVariant,
  getImages,
  getRelatedProducts,
} from "./utils";

import { convertRichTextToPlainText } from "core/utils";
import { useAuth } from "@saleor/sdk";
import { useState } from "react";
import ProductGallery from "components/organisms/ProductGallery";
import Breadcrumbs, { getBreadcrumbs } from "components/atoms/Breadcrumbs";
import ProductMeta from "components/molecules/ProductMeta";
import ProductPricing from "components/molecules/ProductPricing";
import paths from "core/paths";

import styles from "./ProductPage.module.scss";
import { productStructuredData } from "core/SEO/structuredData";

import ProductVariantSelection from "components/organisms/ProductVariantSelection";
import AddToCartSection from "components/organisms/AddToCartSection";
import ProductDescription from "components/molecules/ProductDescription";
import ProductAdditionalInformation from "components/molecules/ProductAdditionalInformation";
import RelatedProducts from "components/organisms/RelatedProducts";

import Grid from "views/Home/Grid";

import FeatureGridTile from "views/Home/FeatureGridTile/FeatureGridTile";
import { icons } from "core/constants";
import { StoryblokComponent } from "@storyblok/react";
import Button from "components/atoms/Button";

// const populateBreadcrumbs = (product) => [
//   {
//     href: paths.category.replace("[slug]", product.category.slug),
//     name: product.category.name,
//   },
//   {
//     href: paths.product.replace("[slug]", product.slug),
//     name: product.name,
//   },
// ];
const ProductPage = ({ product, category, story: { content } }) => {
  const { user } = useAuth();

  const [variantId, setVariantId] = useState(product.defaultVariant?.id);

  const variant = getActiveVariant(product, variantId);

  const brand = product.attributes.filter(
    (attribute) => attribute.attribute.slug === "brand"
  )[0]?.values[0]?.name;

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
      <>
        <script type="application/ld+json">
          {productStructuredData(product)}
        </script>

        <div className="container-xl py-8">
          <div className="row">
            <div className="col-12 col-md-6">
              <ProductGallery images={getImages(product, variantId)} />
              <ProductDescription description={product.description} />
              <ProductAdditionalInformation
                product={product}
                variant={variant}
              />
            </div>
            <div className="col-12 col-md-6">
              {category?.ancestors && (
                <Breadcrumbs
                  breadcrumbs={getBreadcrumbs(
                    category,
                    category.ancestors,
                    product
                  )}
                />
              )}
              <article className={styles.content}>
                <div className={styles.section}>
                  <h1 className={styles.title}>{product.name}</h1>
                  <span className={styles.brand}>{brand}</span>

                  <ProductMeta
                    sku={variant?.sku}
                    quantityAvailable={variant?.quantityAvailable}
                  />

                  <ProductPricing
                    productPricing={product?.pricing}
                    variantPricing={variant?.pricing}
                  />
                </div>
                {product.variants.length > 1 && (
                  <div className={styles.section}>
                    <ProductVariantSelection
                      variants={product.variants}
                      variant={variant}
                      setVariantId={setVariantId}
                    />
                  </div>
                )}

                <div className={styles.section}>
                  {variant && (
                    <AddToCartSection
                      product={product}
                      variant={variant}
                      isAvailableForPurchase={product.isAvailableForPurchase}
                      availableForPurchase={product.availableForPurchase}
                    />
                  )}
                  {!user && (
                    <Button
                      label={"Login or sign up to purchase"}
                      path={paths.login}
                      icon={icons.faArrowRight}
                    />
                  )}
                </div>
              </article>
              <Grid cols={2} height={100}>
                <FeatureGridTile
                  icon={icons.faTruck}
                  bold={"FREE"}
                  text={"Next day delivery available"}
                />
                <FeatureGridTile
                  icon={icons.faBoxOpen}
                  bold={"Zero"}
                  text={"hassle returns & collections"}
                />
              </Grid>
            </div>
          </div>
        </div>
        <StoryblokComponent blok={content} />
        <RelatedProducts
          header={`More from ${product.category.name}`}
          products={getRelatedProducts(product.category, product.id)}
        />

        {/* <FeefoReviews /> */}
      </>
    </>
  );
};

export default ProductPage;
