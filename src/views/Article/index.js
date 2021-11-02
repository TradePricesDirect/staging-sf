import MetaTags from "components/atoms/MetaTags";
import Page from "./Page";

const ArticlePage = ({ page }) => {
  return (
    <>
      <MetaTags
        title={page.seoTitle || page.title}
        description={page.seoDescription}
      />

      <Page key={page.id} page={page} />
    </>
  );
};

export default ArticlePage;
