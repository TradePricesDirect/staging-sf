import { useAuth } from "@saleor/sdk";
import { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Input from "components/atoms/Input";
import SubmitButton from "components/atoms/SubmitButton";
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
      <button onClick={onOpen} type="button" className="btn btn-primary">
        Create a List
      </button>

      <Modal title="Create a List" isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
          <Input
            label="List Name"
            name="name"
            register={register}
            validation={{ required: true }}
            error={errors.name}
          />

          <SubmitButton loading={isSubmitting}>Create List</SubmitButton>
        </form>
      </Modal>
    </>
  );
};

export default WishlistCreate;
