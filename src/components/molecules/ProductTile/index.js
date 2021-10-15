import Link from "next/link";
import Thumbnail from "components/molecules/Thumbnail";
import TaxedMoneyProduct from "components/molecules/TaxedMoneyProduct";

import paths from "core/paths";

import styles from "./ProductTile.module.scss";
import { get } from "lodash";

const ProductTile = ({ product }) => {
  const price = get(product, "pricing.priceRange.start");

  return (
    <div className={styles.wrap}>
      <Link href={paths.product.replace("[slug]", product.slug)}>
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
    </div>
  );
};

export default ProductTile;
