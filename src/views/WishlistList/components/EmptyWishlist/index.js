import useMenuLink from "hooks/useMenuLink";
import Button from "components/atoms/Button";
import { icons } from "core/constants";

const EmptyWishlist = () => {
  const openMenu = useMenuLink();

  return (
    <div className="py-8 text-center">
      <h3>Start Building Your List!</h3>
      <p>Browse our wide range of products and add items to lists.</p>


      <Button
        label={`Continue Shopping`}
        icon={icons.faArrowRight}
        onClick={openMenu}
      />

    </div>
  );
};

export default EmptyWishlist;
