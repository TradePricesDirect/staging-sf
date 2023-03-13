import Link from "next/link";
import _ from "lodash";
import paths from "core/paths";

import TaxedMoneyProduct from "components/molecules/TaxedMoneyProduct";
import AddToWishlist from "components/molecules/AddToWishlist";

import styles from "./ProductTile.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/atoms/Button";
import { icons } from "core/constants";

const ProductTile: FC<{
  product?: any;
  variant?: any;
  loading?: boolean;
  className?: string;
  financePromo?: boolean;
}> = ({ product, variant = null, className, financePromo }) => {
  // const { user } = useAuth();

  const price = _.get(product, "pricing.priceRange.start");

  const url = paths.product.replace("[slug]", product?.slug);

  const hasVariants = !variant && product?.variants?.length > 1;

  const selectedVariant = variant || product?.defaultVariant;

  const [hover, setHover] = useState(false);
  const eventHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return (
    <div className={clsx(styles.container, className)}>
      {product && (
        <AddToWishlist
          name={product.name}
          product={product}
          variant={selectedVariant}
        />
      )}

      <Link href={url} className={clsx(styles.card)} {...eventHandlers}>
        {/* <div className={styles.content}> */}
        <div className={clsx(styles.image, !product ? styles.loading : "")}>
          {product && (
            <Image
              src={product.thumbnail2x?.url || product.thumbnail?.url}
              alt={product.thumbnail2x?.alt || product.thumbnail?.alt}
              fill
            />
          )}
        </div>

        <div className={styles.content}>
          <div className={clsx(styles.title, !product ? styles.loading : "")}>
            {product && (
              <>
                <span></span>
                <p>{product.name}</p>
              </>
            )}
          </div>
          <div className={clsx(styles.price, !product ? styles.loading : "")}>
            {product && (
              <>
                <TaxedMoneyProduct
                  taxedMoney={price}
                  financePromo={financePromo}
                />
                {/* <span className={styles.main}>{product.name}</span> */}
                {/* <span className={styles.finance}>{product.name}</span> */}
                <span className={styles.delivery}>
                  <FontAwesomeIcon icon={icons.faTruck} />{" "}
                  {"Free Next Day Delivery"}
                </span>
              </>
            )}
          </div>
          {/* <div className={styles.price}> */}
        </div>
        <div className={clsx(styles.button, !product ? styles.loading : "")}>
          {product && <Button label={"View Product"} hover={hover} />}
        </div>
        {/* </div> */}
        {/* </div> */}
      </Link>

      {/* <div className="text-center">
        {user && !hasVariants ? (
          <AddToCartButton
            variant={selectedVariant}
            quantity={1}
            isAvailableForPurchase={product.isAvailableForPurchase}
            availableForPurchase={product.availableForPurchase}
          />
        ) : (
          <Link href={url} className="btn btn-outline-primary">
            View Product
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default ProductTile;
