import {
  getCarousels,
  getShopAttributes,
  getStory,
  getStoryBlokAssets,
} from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import HomePage from "views/Home";

export default HomePage;

export async function getStaticProps({ preview = false }) {
  const slug = "home";
  const storyblokData = await getStory(slug);
  const carousels = await getCarousels(storyblokData);

  const attributes = await getShopAttributes({});
  const { assets: logoAssets } = await getStoryBlokAssets(205301);
  const logos = {};
  logoAssets.forEach((logoAsset) => {
    if (logoAsset.title) {
      logos[logoAsset.title] = logoAsset;
    }
  });

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
