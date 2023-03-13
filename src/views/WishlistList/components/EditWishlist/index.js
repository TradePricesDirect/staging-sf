import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { icons } from "core/constants";
import paths from "core/paths";
import { updateWishlist } from "utils/wishlists";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Input from "components/atoms/Input";
import DeleteWishlistButton from "components/molecules/DeleteWishlistButton";

import Button from "components/atoms/Button";

const EditWishlist = ({ wishlist }) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    mutate(`/api/wishlists/${wishlist.id}`, { ...wishlist, ...data }, false);

    onClose();

    await updateWishlist(wishlist.id, data);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        label={`Settings`}
        icon={icons.faCog}
      />

      <Modal title="Edit List" isOpen={isOpen} onClose={onClose} size="sm">
        <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
          <Input
            label="List Name"
            name="name"
            defaultValue={wishlist.name}
            register={register}
            validation={{ required: true }}
            error={errors.name}
          />

          <div className="d-flex g-4 justify-content-between">

            <Button
              submit
              color={"secondary"}
              loading={isSubmitting}
              label={`Save changes`}
              icon={icons.faArrowRight}
            />
            <DeleteWishlistButton
              id={wishlist.id}
              className="btn text-danger"
              onDelete={() => router.push(paths.wishlists)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditWishlist;
