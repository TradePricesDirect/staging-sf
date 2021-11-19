import { useState } from "react";
import { useAuth } from "@saleor/sdk";
import { useSWRConfig } from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import useDisclosure from "hooks/useDisclosure";
import { deleteWishlist } from "utils/wishlists";
import Modal from "components/organisms/Modal";
import SubmitButton from "components/atoms/SubmitButton";

const DeleteWishlistButton = ({ id, className, onDelete }) => {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    await deleteWishlist(id, user.id);

    await mutate(`/api/wishlists`);

    if (onDelete) onDelete();
  };

  return (
    <>
      <button type="button" onClick={onOpen} className={className}>
        <FontAwesomeIcon icon={faTrash} />
      </button>

      <Modal title="Are you sure?" isOpen={isOpen} onClose={onClose}>
        <p>Are you sure you want to delete this list? It cannot be undone.</p>

        <div className="d-flex g-4 justify-content-between">
          <SubmitButton type="button" loading={loading} onClick={handleDelete}>
            Delete
          </SubmitButton>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-link"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteWishlistButton;
