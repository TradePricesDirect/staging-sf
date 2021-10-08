import MetaTags from "layouts/components/MetaTags";
import SkipNavigation from "layouts/components/SkipNavigation";

const BaseLayout = ({ children }) => {
  return (
    <>
      <MetaTags />

      <SkipNavigation />

      {children}
    </>
  );
};

export default BaseLayout;
