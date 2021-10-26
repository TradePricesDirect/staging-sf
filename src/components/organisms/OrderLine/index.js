import Link from "next/link";
import paths from "core/paths";
import Thumbnail from "components/molecules/Thumbnail";
import TaxedMoney from "components/molecules/TaxedMoney";

import styles from "./OrderLine.module.scss";

const OrderLine = ({ variant, quantity, unitPrice, totalPrice }) => {
  return (
    <tr>
      <td scope="row">
        <div className={styles.content}>
          <Link href={paths.product.replace("[slug]", variant.product.slug)}>
            <a className={styles.thumbnail}>
              <Thumbnail thumbnail={variant.product.thumbnail} />
            </a>
          </Link>

          <div className={styles.body}>
            <Link href={paths.product.replace("[slug]", variant.product.slug)}>
              <a className={styles.name}>{variant.product.name}</a>
            </Link>

            <p className={styles.sku}>{variant.sku}</p>

            <ul className={styles.variants}>
              {variant.attributes.map(({ attribute, values }) => (
                <li key={attribute.id} className={styles.variant}>
                  {attribute.name}:{" "}
                  <span>{values.map((value) => value.name).join(", ")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </td>
      <td>
        <TaxedMoney taxedMoney={unitPrice} gross />
      </td>

      <td>{quantity}</td>

      <td>
        <TaxedMoney taxedMoney={totalPrice} gross />
      </td>
    </tr>
  );
};

export default OrderLine;
