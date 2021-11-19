import { useMemo } from "react";
import Link from "next/link";
import _ from "lodash";
import paths from "core/paths";
import pluralize from "utils/pluralize";
import Thumbnail from "components/molecules/Thumbnail";
import DeleteWishlistButton from "components/molecules/DeleteWishlistButton";

import styles from "./WishlistTile.module.scss";

const WishlistTile = ({ wishlist }) => {
  const url = paths.wishlist.replace("[id]", wishlist.id);

  const lineCount = _.size(wishlist.lines);

  const images = useMemo(
    () => getProductImages(wishlist.lines),
    [wishlist.lines]
  );

  return (
    <div className={styles.wrap}>
      <Link href={url}>
        <a className={styles.card}>
          <div className={styles.gallery}>
            {images.map((image, index) => {
              return (
                <div
                  key={`image-${wishlist.id}-${index}`}
                  className={styles.item}
                >
                  {image && <Thumbnail thumbnail={image} />}
                </div>
              );
            })}
          </div>

          <div className={styles.content}>
            <h4 className={styles.name}>{wishlist.name}</h4>
            <p className={styles.count}>{pluralize(lineCount, "item")}</p>
          </div>
        </a>
      </Link>

      <DeleteWishlistButton id={wishlist.id} className={styles.delete} />
    </div>
  );
};

export default WishlistTile;

function getProductImages(lines) {
  let images = _.map(lines, ({ product }) => product?.thumbnail || null);

  for (let i = 0; i < 5; i++) {
    if (!images[i]) images[i] = null;
  }

  return _.take(images, 5);
}
