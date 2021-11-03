import ProductListHero from "components/molecules/ProductListHero";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarousel from "components/organisms/CategoryCarousel";

const ShopPage = ({ categories }) => {
  const level0 = categories?.level0?.edges.map((e) => e.node) || [];
  const level1 = categories?.level1?.edges.map((e) => e.node) || [];

  return (
    <>
      <ProductListHero
        title="Shop All"
        description="Buy kitchens, bathrooms, boilers, & more at trade prices direct from the manufacturer."
      />

      <CategoryList categories={level0} />
      <CategoryCarousel categories={level1} viewAllButton={false} />
    </>
  );
};

export default ShopPage;
