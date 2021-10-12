import Welcome from "./Welcome";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarousel from "components/organisms/CategoryCarousel";

const NewUserPage = ({ categories }) => {
  const level0 = categories?.level0?.edges.map((e) => e.node) || [];
  const level1 = categories?.level1?.edges.map((e) => e.node) || [];

  return (
    <>
      <Welcome />
      <CategoryList categories={level0} />
      <CategoryCarousel categories={level1} />
    </>
  );
};

export default NewUserPage;
