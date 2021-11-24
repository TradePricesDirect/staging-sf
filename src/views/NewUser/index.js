import Welcome from "./Welcome";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarouselEndless from "components/organisms/CategoryCarouselEndless";

const NewUserPage = ({ categoriesLevel0, categoriesLevel1 }) => {
  return (
    <>
      <Welcome />
      <CategoryList categories={categoriesLevel0} />
      <CategoryCarouselEndless categories={categoriesLevel1} />
    </>
  );
};

export default NewUserPage;
