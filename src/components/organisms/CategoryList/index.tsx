import paths from "core/paths";
import CategoryTile from "components/molecules/CategoryTile";
import useIsTablet from "hooks/useIsTablet";
import useIsMobile from "hooks/useIsMobile";
import styles from "./CategoryList.module.scss";
import { icons } from "core/constants";
import { useRouter } from "next/router";

const CategoryList = ({ category }) => {
  const router = useRouter();
  if (!category.children.length) {
    router.push(paths.plp.replace("[slug]", category.slug));
  }
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const gridTemplateColumns = isMobile
    ? "repeat(1, 100%)"
    : isTablet
    ? "repeat(2, 50%)"
    : "repeat(3, 33.33%)";

  return (
    <section className={styles.container}>
      <ul className={styles.list} style={{ gridTemplateColumns }}>
        {category.ancestors?.length && (
          <li>
            <CategoryTile
              name={`Back to ${category.ancestors[0].name}`}
              icon={icons.faArrowLeft}
              className={styles.tile}
              href={paths.category.replace(
                "[slug]",
                category.ancestors[0].slug
              )}
            />
          </li>
        )}
        {category.children.map((category) => {
          const { id, name, slug, backgroundImage: image, children } = category;
          const path = children?.length ? paths.category : paths.plp;

          return (
            <li key={id}>
              <CategoryTile
              // useBackgroundImage
                name={name}
                image={image}
                href={path.replace("[slug]", slug)}
                className={styles.tile}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CategoryList;
