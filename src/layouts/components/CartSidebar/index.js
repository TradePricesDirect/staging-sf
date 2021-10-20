import { useAuth } from "@saleor/sdk";
import { useOverlay } from "contexts/OverlayContext";
import Drawer from "components/organisms/Drawer";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import CartItems from "components/organisms/CartItems";
import CartGuest from "./CartGuest";

import styles from "./CartSidebar.module.scss";

const CartSidebar = () => {
  const overlay = useOverlay();

  const { user } = useAuth();

  return (
    <Drawer isOpen={overlay.type === "cart"} position="right">
      <div className={styles.wrap}>
        <CartHeader />

        <div className={styles.body}>
          {user ? <CartItems /> : <CartGuest />}
        </div>

        <CartFooter />
      </div>
    </Drawer>
  );
};

export default CartSidebar;
