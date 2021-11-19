import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import _ from "lodash";
import paths from "core/paths";
import Thumbnail from "components/molecules/Thumbnail";
import TaxedMoneyProduct from "components/molecules/TaxedMoneyProduct";
import AddToCartButton from "components/molecules/AddToCartButton";
import AddToWishlist from "components/molecules/AddToWishlist";

import styles from "./ProductTile.module.scss";

const ProductTile = ({ product, variant = null }) => {
  const { user } = useAuth();

  const price = _.get(product, "pricing.priceRange.start");

  const url = paths.product.replace("[slug]", product.slug);

  const hasVariants = !variant && product.variants?.length > 1;

  const selectedVariant = variant || product.defaultVariant;

  return (
    <div className={styles.wrap}>
      <Link href={url}>
        <a className={styles.link}>
          <div className={styles.image}>
            <Thumbnail thumbnail={product.thumbnail2x} />
          </div>

          <h2 className={styles.title}>{product.name}</h2>

          <div className={styles.price}>
            <TaxedMoneyProduct taxedMoney={price} />
          </div>
        </a>
      </Link>

      <div className="text-center">
        {user && !hasVariants ? (
          <AddToCartButton
            variant={selectedVariant}
            quantity={1}
            isAvailableForPurchase={product.isAvailableForPurchase}
            availableForPurchase={product.availableForPurchase}
          />
        ) : (
          <Link href={url}>
            <a className="btn btn-outline-primary">View Product</a>
          </Link>
        )}
      </div>

      <AddToWishlist
        name={product.name}
        product={product}
        variant={selectedVariant}
      />
    </div>
  );
};

export default ProductTile;
