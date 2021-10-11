import { exhaustList, getSaleorApi, getShopAttributes } from "utils/ssr";
import { incrementalStaticRegenerationRevalidate } from "core/constants";
import CollectionView from "views/Collection";

export default CollectionView;

export async function getStaticPaths() {
  const { api } = await getSaleorApi();

  const { data } = await exhaustList(api.collections.getList({ first: 100 }));

  const paths = data.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { api } = await getSaleorApi();

  const { data: details } = await api.collections.getDetails({ slug });

  const { id } = details;

  // Get attributes
  const attributes = await getShopAttributes({ collectionId: id });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      data: {
        id,
        details,
        attributes,
      },
    },
  };
}
