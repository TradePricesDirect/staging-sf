import useMenuLink from "hooks/useMenuLink";

const Empty = () => {
  const openMenu = useMenuLink();

  return (
    <>
      <p>Your basket is currently empty.</p>

      <button type="button" onClick={openMenu} className="btn btn-primary">
        Continue Shopping
      </button>
    </>
  );
};

export default Empty;
