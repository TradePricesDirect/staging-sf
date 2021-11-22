import { useMemo } from "react";
import { useAuth } from "@saleor/sdk";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartEmpty } from "@fortawesome/pro-light-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/pro-solid-svg-icons";
import { useWishlists } from "utils/wishlists";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Guest from "./Guest";
import Empty from "./Empty";
import Wishlists from "./Wishlists";

import styles from "./AddToWishlist.module.scss";

const AddToWishlist = ({
  name,
  product,
  variant,
  className = clsx("btn btn-sm", styles.button),
}) => {
  console.log({ name, product, variant });

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
    if (!wishlists.length) return <Empty />;

    return (
      <Wishlists
        product={product}
        wishlists={wishlists}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  };

  if (loading) return null;

  return (
    <>
      <button
        onClick={onOpen}
        type="button"
        className={className}
        aria-label={`Add ${name} to a list`}
      >
        <FontAwesomeIcon icon={inWishlist ? faHeartFull : faHeartEmpty} />
      </button>

      <Modal title="Save to List" isOpen={isOpen} onClose={onClose}>
        {renderModal()}
      </Modal>
    </>
  );
};

export default AddToWishlist;
