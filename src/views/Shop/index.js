import ProductListHero from "components/molecules/ProductListHero";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarouselEndless from "components/organisms/CategoryCarouselEndless";

const ShopPage = ({ categories }) => {
  const level0 = categories?.level0?.edges.map((e) => e.node) || [];
  const level1 = categories?.level1?.edges.map((e) => e.node) || [];

  return (
    <>
      <ProductListHero
        title="Shop All"
        description={{
          time: 1636020324746,
          blocks: [
            {
              data: {
                text: "Buy kitchens, bathrooms, boilers, & more at trade prices direct from the manufacturer.",
              },
              type: "paragraph",
            },
          ],
          version: "2.20.0",
        }}
      />

      <CategoryList categories={level0} />
      <CategoryCarouselEndless categories={level1} viewAllButton={false} />
    </>
  );
};

export default ShopPage;
