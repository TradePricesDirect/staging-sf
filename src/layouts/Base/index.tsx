import clsx from "clsx";
import BaseMetaTags from "layouts/components/BaseMetaTags";
import Overlay from "layouts/components/Overlay/Overlay";
import SkipNavigation from "layouts/components/SkipNavigation";
import font from "../../core/fonts";
const BaseLayout = ({ children }) => (
  <div {...font}>
    <BaseMetaTags />
    <SkipNavigation />
    {children}
    <Overlay />
  </div>
);

export default BaseLayout;
