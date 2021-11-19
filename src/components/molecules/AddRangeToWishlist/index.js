import { useMemo } from "react";
import { useAuth } from "@saleor/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartEmpty } from "@fortawesome/pro-light-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/pro-solid-svg-icons";
import { useWishlists } from "utils/wishlists";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Guest from "./Guest";
import Empty from "./Empty";
import Wishlists from "./Wishlists";

const AddRangeToWishlist = ({ range, className }) => {
  const { user } = useAuth();
  const { wishlists, loading, addItem, removeItem } = useWishlists();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const products = useMemo(() => {
    return range.items.map((item) => ({
      product_id: item.product?.id || item.variant.product?.id,
      variant_id: item.variant.id,
    }));
  }, [range.items]);

  const inWishlist = useMemo(
    () => isEntireRangeInAWishlist(wishlists, products),
    [wishlists]
  );

  const handleAdd = (id) => {
    const wishlist = _.find(wishlists, ["id", id]);
    const lines = _.map(wishlist.lines, (line) =>
      _.pick(line, ["product_id", "variant_id"])
    );

    const addProducts = _.differenceWith(products, lines, _.isEqual);

    addItem(id, addProducts);
  };

  const handleRemove = (id) => removeItem(id, products);

  const renderModal = () => {
    if (!user) return <Guest />;
    if (!wishlists.length) return <Empty />;

    return (
      <Wishlists
        wishlists={wishlists}
        onAdd={handleAdd}
        onRemove={handleRemove}
        inWishlist={inWishlist}
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
        aria-label={`Add ${range.name} to a list`}
      >
        <FontAwesomeIcon icon={inWishlist ? faHeartFull : faHeartEmpty} />
      </button>

      <Modal title="Save to List" isOpen={isOpen} onClose={onClose}>
        {renderModal()}
      </Modal>
    </>
  );
};

export default AddRangeToWishlist;

// Check if every product in this range is included in any wishlist
const isEntireRangeInAWishlist = (wishlists, products) => {
  if (!wishlists) return false;

  return wishlists.find(({ lines }) => {
    const list = _.map(lines, (line) =>
      _.pick(line, ["product_id", "variant_id"])
    );

    const exists = _.intersectionWith(products, list, _.isEqual);

    return exists.length === products.length;
  });
};
