import Link from "next/link";
import clsx from "clsx";
import paths from "core/paths";

import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav className={styles.wrap}>
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={styles.list}
      >
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
        >
          <Link href={paths.home}>{"Home"}</Link>
          <meta itemProp="position" content="1" />
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={`${breadcrumb.value}-${index}`}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className={clsx(index === breadcrumbs.length - 1 && styles.active)}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            <meta itemProp="position" content={index + 2} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

export const extractBreadcrumbs = (category, ancestors) => {
  const constructLink = ({ slug, name }) => ({
    href: paths.category.replace("[slug]", slug),
    name: name,
  });

  let breadcrumbs = [constructLink(category)];

  if (ancestors && ancestors.length) {
    const ancestorsList = ancestors.map((category) => constructLink(category));
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};
