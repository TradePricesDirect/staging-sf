import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import useMenuLink from "hooks/useMenuLink";
import Button from "../../components/atoms/Button"

const Empty = () => {
  const openMenu = useMenuLink();

  return (
    <>
      <p>Your basket is currently empty.</p>

    <Button color="secondary" label="Continue Shopping" icon={faArrowRight} onClick={openMenu}/>
    </>
  );
};

export default Empty;
