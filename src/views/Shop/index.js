import ProductListHero from "components/molecules/ProductListHero";
import CategoryList from "components/organisms/CategoryList";
import Carousel from "components/organisms/Carousel";

const ShopPage = ({ categoriesLevel0, categoriesLevel1 }) => {
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

      <CategoryList categories={categoriesLevel0} />
      <Carousel
        categories={categoriesLevel1}
        viewAllButton={false}
      />
    </>
  );
};

export default ShopPage;
