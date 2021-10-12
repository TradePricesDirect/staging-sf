import { getCategoryLevels } from "utils/ssr";
import NewUserPage from "views/NewUser";

export default NewUserPage;

export async function getStaticProps() {
  const categories = await getCategoryLevels();

  return {
    props: {
      categories,
    },
  };
}
