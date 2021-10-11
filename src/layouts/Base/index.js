import BaseMetaTags from "layouts/components/BaseMetaTags";
import SkipNavigation from "layouts/components/SkipNavigation";

const BaseLayout = ({ children }) => {
  return (
    <>
      <BaseMetaTags />

      <SkipNavigation />

      {children}
    </>
  );
};

export default BaseLayout;
