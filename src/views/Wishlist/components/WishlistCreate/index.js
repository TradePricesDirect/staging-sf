import { useAuth } from "@saleor/sdk";
import { useSWRConfig } from "swr";
import { icons } from "core/constants";
import { useForm } from "react-hook-form";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Input from "components/atoms/Input";
import Button from "components/atoms/Button";
import { createWishlist } from "utils/wishlists";

const WishlistCreate = () => {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;

  const onSubmit = async ({ name }) => {
    // send a request to the API to update the source
    await createWishlist({ name });

    await mutate("/api/wishlists");

    onClose();
    reset();
  };

  return (
    <>
      <Button
        color={"secondary"}
        label={`Create a List`}
        onClick={onOpen}
        icon={icons.faArrowRight}
      />

      <Modal title="Create a List" isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
          <Input
            label="List Name"
            name="name"
            register={register}
            validation={{ required: true }}
            error={errors.name}
          />

          <Button
            submit
            color={"secondary"}
            label={`Create list`}
            icon={icons.faArrowRight}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      </Modal>
    </>
  );
};

export default WishlistCreate;
