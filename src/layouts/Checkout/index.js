import BaseLayout from "layouts/Base";
import CheckoutHeader from "layouts/components/CheckoutHeader";
import Subfooter from "layouts/components/Subfooter";
import Footer from "layouts/components/Footer";

const CheckoutLayout = ({ footerMenus, children }) => {
  return (
    <BaseLayout>
      <CheckoutHeader />

      <main id="main">{children}</main>

      <Subfooter />
      <Footer menus={footerMenus} />
    </BaseLayout>
  );
};

export default CheckoutLayout;
