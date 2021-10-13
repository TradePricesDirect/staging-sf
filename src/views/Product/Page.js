import { useState } from "react";
import paths from "core/paths";
import { productStructuredData } from "core/SEO/structuredData";
import { getActiveVariant, getImages } from "./utils";
import Breadcrumbs from "components/atoms/Breadcrumbs";
import FeefoReviews from "components/molecules/FeefoReviews";
import ProductGallery from "components/organisms/ProductGallery";
import FinanceRibbon from "components/atoms/FinanceRibbon";
import ProductMeta from "components/molecules/ProductMeta";
import ProductDescription from "components/molecules/ProductDescription";
import TaxedMoney from "components/molecules/TaxedMoney";
import CallToActions from "./CallToActions";
import ProductVariantSelection from "components/organisms/ProductVariantSelection";
import AddToCartSection from "components/organisms/AddToCartSection";

import styles from "./ProductPage.module.scss";

const populateBreadcrumbs = (product) => [
  {
    href: paths.category.replace("[slug]", product.category.slug),
    name: product.category.name,
  },
  {
    href: paths.product.replace("[slug]", product.slug),
    name: product.name,
  },
];

const Page = ({ product }) => {
  const [variantId, setVariantId] = useState(
    product.defaultVariant?.id || null
  );

  const variant = getActiveVariant(product, variantId);

  return (
    <>
      <script type="application/ld+json">
        {productStructuredData(product)}
      </script>

      <div className="container-xl py-8">
        <div className="row">
          <div className="col-12 col-md-6">
            <ProductGallery images={getImages(product, variantId)} />
          </div>
          <div className="col-12 col-md-6">
            <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
            <article className={styles.content}>
              <FinanceRibbon className={styles.ribbon} />

              <h1 className={styles.title}>{product.name}</h1>

              <ProductMeta
                sku={variant?.sku}
                quantityAvailable={variant?.quantityAvailable}
              />

              <div className={styles.pricing}>
                <TaxedMoney taxedMoney={variant?.pricing.price} />
              </div>

              <CallToActions />

              <ProductVariantSelection
                variants={product.variants}
                variantId={variantId}
                setVariantId={setVariantId}
              />

              {/* <AddToCartSection variantId={variantId} /> */}

              {/* TODO: ADD TO BASKET (onAdd(variantId, quantity)) */}

              <ProductDescription description={product.description} />

              {/* TODO: ADDITIONAL INFORMATION (attributes||metadata??) */}
            </article>
          </div>
        </div>

        {/* TODO: OTHER PRODUCTS IN THIS CATEGORY */}
      </div>

      <FeefoReviews />
    </>
  );
};

export default Page;
