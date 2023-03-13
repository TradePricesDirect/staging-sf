import { FC, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";
import paths from "core/paths";
import { useWishlists } from "utils/wishlists";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Thumbnail from "components/molecules/Thumbnail";
import Guest from "./Guest";
import Empty from "./Empty";
import Wishlists from "./Wishlists";

import styles from "./AddToWishlist.module.scss";

const AddToWishlist: FC<{
  name?: any;
  product?: any;
  variant?: any;
  className?: any;
}> = ({
  name,
  product,
  variant,
  className,
  // className = clsx("btn btn-sm", styles.button),
}) => {
  const { user } = useAuth();
  const { wishlists, loading, addItem, removeItem } = useWishlists();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const products = useMemo(
    () => [
      {
        product_id: product.id,
        variant_id: variant.id,
      },
    ],
    [product, variant]
  );

  // Check if this product is in any of user's wishlists
  const inWishlist = useMemo(() => {
    if (!wishlists) return false;

    return wishlists.find(({ lines }) => {
      return lines.find((line) => {
        return line.product_id === product.id && line.variant_id === variant.id;
      });
    });
  }, [wishlists]);

  const handleAdd = (id) => addItem(id, products);

  const handleRemove = (id) => removeItem(id, products);

  const renderModal = () => {
    if (!user) return <Guest />;

    if (!wishlists?.length) return <Empty />;

    return (
      <div className={styles.content}>
        <button
          type="button"
          onClick={onClose}
          className={clsx("btn btn-sm text-secondary", styles.closeButton)}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={icons.faTimes} />
          <span className="visually-hidden">Close</span>
        </button>

        <div className={styles.image}>
          <Thumbnail thumbnail={product.thumbnail} />
        </div>
        <div className={styles.body}>
          <div className={styles.header}>
            <h4 className={styles.title}>Save to List</h4>

            <Link
              href={paths.wishlists}
              className="btn btn-sm btn-link text-secondary"
            >
              Create List
            </Link>
          </div>

          <Wishlists
            product={product}
            wishlists={wishlists}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        </div>
      </div>
    );
  };

  if (loading) return null;

  return (
    <>
      <button
        onClick={onOpen}
        type="button"
        className={styles.button}
        aria-label={`Add ${name} to a wishlist`}
      >
        <FontAwesomeIcon icon={inWishlist ? icons.faHeart : icons.faHeart} />
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        {renderModal()}
      </Modal>
    </>
  );
};

export default AddToWishlist;
