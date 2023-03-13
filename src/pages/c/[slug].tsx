import {
  getCarousels,
  getStory,
  getStories,
  getShopAttributes,
  getStoryBlokAssets,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import ContentPage from "views/Content";

export default ContentPage;
const dir = "c";

export async function getStaticPaths() {
  const { stories: data } = await getStories(dir);
  const paths = data.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const storyblokData = await getStory(`${dir}/${slug}`);
  const carousels = await getCarousels(storyblokData);
  const attributes = await getShopAttributes({});
  const { assets: logoAssets } = await getStoryBlokAssets(205301);
  const logos = {};
  logoAssets.forEach((logoAsset) => (logos[logoAsset.title] = logoAsset));

  const brands = attributes
    .filter((attribute) => attribute.slug === "brand")[0]
    .choices.edges.map(({ node }) => ({
      ...node,
      backgroundImage: logos[node.slug] || null,
    }));

  return {
    props: {
      carousels,
      brands,
      story: storyblokData ? storyblokData.story : false,
      key: storyblokData ? storyblokData.story.id : false,
    },
    revalidate: incrementalStaticRegenerationRevalidate,
  };
}
