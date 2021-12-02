import { getServerSideSitemap } from "next-sitemap";
import { getAllProducts } from "utils/ssr";

export const getServerSideProps = async (ctx) => {
  const products = await getAllProducts();

  const fields = products.map(({ slug }) => ({
    loc: `https://tradepricesdirect.com/product/${slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: "daily",
  }));

  ctx.res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
