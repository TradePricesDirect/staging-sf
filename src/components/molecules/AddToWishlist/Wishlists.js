import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartEmpty } from "@fortawesome/pro-light-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/pro-solid-svg-icons";
import pluralize from "utils/pluralize";

import styles from "./AddToWishlist.module.scss";

const Wishlists = ({ product, wishlists, onAdd, onRemove }) => {
  return (
    <ul className={styles.list}>
      {wishlists.map((wishlist) => {
        return (
          <li key={wishlist.id}>
            <Wishlist
              wishlist={wishlist}
              inWishlist={wishlist.lines.find(
                (line) => line.product_id === product.id
              )}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Wishlists;

const Wishlist = ({ wishlist, inWishlist, onAdd, onRemove }) => {
  const handleAddRemove = inWishlist ? onRemove : onAdd;

  return (
    <button
      onClick={() => handleAddRemove(wishlist.id)}
      type="button"
      className={styles.link}
    >
      <div>
        <div className={styles.name}>{wishlist.name}</div>
        <p className={styles.count}>
          {pluralize(wishlist.lines.length, "item")}
        </p>
      </div>

      <FontAwesomeIcon
        icon={inWishlist ? faHeartFull : faHeartEmpty}
        className={styles.icon}
      />
    </button>
  );
};
