import { getCategoriesByLevel } from "utils/ssr";
import NewUserPage from "views/NewUser";

export default NewUserPage;

export async function getStaticProps() {
  const categoriesLevel0 = await getCategoriesByLevel(0, 3);
  const categoriesLevel1 = await getCategoriesByLevel(1, 50);

  return {
    props: {
      categoriesLevel0,
      categoriesLevel1,
    },
  };
}
