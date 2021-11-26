import { useOverlay } from "contexts/OverlayContext";

const useMenuLink = () => {
  const overlay = useOverlay();

  const handleClick = (e) => {
    e.preventDefault();

    overlay.show("menu");
  };

  return handleClick;
};

export default useMenuLink;
