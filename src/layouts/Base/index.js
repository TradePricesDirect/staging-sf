import BaseMetaTags from "layouts/components/BaseMetaTags";
import SkipNavigation from "layouts/components/SkipNavigation";

const BaseLayout = ({ children }) => (
  <>
    <BaseMetaTags />
    <SkipNavigation />
    {children}
  </>
);

export default BaseLayout;
