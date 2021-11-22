import BaseMetaTags from "layouts/components/BaseMetaTags";
import ThirdPartyTags from "layouts/components/ThirdPartyTags";
import SkipNavigation from "layouts/components/SkipNavigation";

const BaseLayout = ({ children }) => {
  return (
    <>
      <BaseMetaTags />

      <ThirdPartyTags />

      <SkipNavigation />

      {children}
    </>
  );
};

export default BaseLayout;
