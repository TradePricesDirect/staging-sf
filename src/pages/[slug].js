import { getPages, getPageDetails } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import ArticlePage from "views/Article";

export default ArticlePage;

export async function getStaticPaths() {
  const pages = await getPages();

  const paths = pages.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const page = await getPageDetails(slug);

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      page,
    },
  };
}
