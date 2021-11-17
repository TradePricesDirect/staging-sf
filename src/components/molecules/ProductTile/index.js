import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import { get } from "lodash";
import paths from "core/paths";
import Thumbnail from "components/molecules/Thumbnail";
import TaxedMoneyProduct from "components/molecules/TaxedMoneyProduct";
import AddToCartButton from "components/molecules/AddToCartButton";

import styles from "./ProductTile.module.scss";

const ProductTile = ({ product }) => {
  const { user } = useAuth();

  const price = get(product, "pricing.priceRange.start");

  const url = paths.product.replace("[slug]", product.slug);

  const hasVariants = product.variants?.length > 1;

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

      {user && !hasVariants ? (
        <AddToCartButton
          variant={product.defaultVariant}
          quantity={1}
          isAvailableForPurchase={product.isAvailableForPurchase}
          availableForPurchase={product.availableForPurchase}
        />
      ) : (
        <Link href={url}>
          <a className="btn btn-primary">View Product</a>
        </Link>
      )}
    </div>
  );
};

export default ProductTile;
