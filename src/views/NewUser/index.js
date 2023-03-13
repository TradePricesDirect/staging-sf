import Welcome from "./Welcome";
import CategoryList from "components/organisms/CategoryList";
import Carousel from "components/organisms/Carousel";

const NewUserPage = ({ categoriesLevel0, categoriesLevel1 }) => {
  return (
    <>
      <Welcome />
      <CategoryList categories={categoriesLevel0} />
      <Carousel categories={categoriesLevel1} />
    </>
  );
};

export default NewUserPage;
