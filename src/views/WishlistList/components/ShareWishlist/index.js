import { useSWRConfig } from "swr";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { icons } from "core/constants";
import { updateWishlist } from "utils/wishlists";
import useDisclosure from "hooks/useDisclosure";
import Modal from "components/organisms/Modal";
import Radio from "components/atoms/Radio";
import Button from "components/atoms/Button";

const CopyLink = dynamic(() => import("../CopyLink"), { ssr: false });

const ShareWishlist = ({ wishlist }) => {
  const { mutate } = useSWRConfig();
  const { register, handleSubmit, setValue } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async ({ type }) => {
    mutate(`/api/wishlists/${wishlist.id}`, { ...wishlist, type }, false);

    await updateWishlist(wishlist.id, { type });
  };

  const isPublic = wishlist.type === "PUBLIC";

  return (
    <>
      <Button
        onClick={onOpen}
        label={`Share`}
        icon={icons.faShare}
      />

      <Modal
        title="Share This List"
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
          <Radio
            name="type"
            register={register}
            label="Private: Only you can view this list"
            defaultChecked={!isPublic}
            value="PRIVATE"
            onChange={(e) => {
              setValue("type", e.target.value);
              handleSubmit(onSubmit)();
            }}
          />
          <Radio
            name="type"
            register={register}
            label="Public: Anyone with the following link can view this list"
            defaultChecked={isPublic}
            value="PUBLIC"
            onChange={(e) => {
              setValue("type", e.target.value);
              handleSubmit(onSubmit)();
            }}
          />
        </form>

        {isPublic && <CopyLink />}
      </Modal>
    </>
  );
};

export default ShareWishlist;
