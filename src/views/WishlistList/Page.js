import { useState, useMemo } from "react";
import Link from "next/link";
import { useAuth, useCart } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import { useOverlay } from "contexts/OverlayContext";
import { groupWishlistItems } from "utils/wishlists";
import pluralize from "utils/pluralize";
import WishlistRangeItem from "components/molecules/WishlistRangeItem";
import ProductTile from "components/molecules/ProductTile";
import Account from "components/templates/Account";
import ShareWishlist from "./components/ShareWishlist";
import EditWishlist from "./components/EditWishlist";
import EmptyWishlist from "./components/EmptyWishlist";
import Button from "components/atoms/Button";

import styles from "./WishlistListView.module.scss";

const Page = ({ wishlist }) => {
  const { user } = useAuth();
  const { addItems } = useCart();
  const overlay = useOverlay();

  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (loading) return;

    setLoading(true);

    const lines = wishlist.lines.map((line) => ({
      variantId: line?.variant_id || line.product.defaultVariant.id,
      quantity: 1,
    }));

    await addItems(lines);

    overlay.show("cart");

    setLoading(false);
  };

  const lineCount = wishlist.lines.length;

  const isMyWishlist = user && wishlist.user_id === user.id;

  const isPublic = wishlist.type == "PUBLIC";

  const { items, ranges } = useMemo(
    () => groupWishlistItems(wishlist.lines),
    [wishlist.lines]
  );


  return (
    <Account>

      <div className="container">
        <header className={styles.header}>
          <div className="row align-items-end justify-content-between">
            <div className="col-12 col-sm-auto">
              <Link href="/lists" className="btn btn-sm btn-link mb-4">
                <FontAwesomeIcon icon={icons.faArrowLeft} className="me-2" />
                Back to lists
              </Link>

              <h2>{wishlist.name}</h2>

              <ul className={styles.info}>
                <li>{pluralize(lineCount, "item")}</li>
                <li>
                  {isPublic ? (
                    <span>
                      <FontAwesomeIcon icon={icons.faLockOpenAlt} /> Public
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon icon={icons.faLockAlt} /> Private
                    </span>
                  )}
                </li>
              </ul>
            </div>

            {isMyWishlist && (
              <div className="col-12 col-sm-auto">
                <ShareWishlist wishlist={wishlist} />
                <EditWishlist wishlist={wishlist} />
              </div>
            )}
          </div>
        </header>

        {lineCount > 0 ? (
          <>
            {ranges.length > 0 && (
              <ul className={styles.ranges}>
                {ranges.map((range, index) => (
                  <li key={`wishlist-line-${range.id}-${index}`}>
                    <WishlistRangeItem range={range} />
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <ul className={styles.list}>
                {items.map(({ product, variant }) => (
                  <li key={`wishlist-line-${product.id}-${variant.id}`}>
                    <ProductTile product={product} variant={variant} />
                  </li>
                ))}
              </ul>
            )}

            <div className="text-end">
              <Button
                onClick={handleAddToCart}
                color={"secondary"}
                loading={loading}
                disabled={loading}
                label={`Add All To Basket`}
                icon={icons.faArrowRight}
              />
            </div>
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </Account>
  );
};

export default Page;
