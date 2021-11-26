import useMenuLink from "hooks/useMenuLink";

const EmptyWishlist = () => {
  const openMenu = useMenuLink();

  return (
    <div className="py-8 text-center">
      <h3>Start Building Your List!</h3>
      <p>Browse our wide range of products and add items to lists.</p>

      <button type="button" onClick={openMenu} className="btn btn-primary">
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyWishlist;
