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

            {index + 1 < breadcrumbs.length
              ?
              <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
              :
              <span className={styles.activeBreadcrumb}>{breadcrumb.name}</span>
            }
            <meta itemProp="position" content={index + 2} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

export const getBreadcrumbs = (category, ancestors, product = null) => {
  const constructLink = ({ slug, name }) => ({
    href: paths.category.replace("[slug]", slug),
    name: name,
  });
  const breadcrumbs = [];

  if (ancestors && ancestors.length) {
    ancestors.forEach(ancestor => breadcrumbs.push(constructLink(ancestor)))
    breadcrumbs.push(constructLink(category));
    if (product) {
      breadcrumbs.push(constructLink(product))
    }
  }

  return breadcrumbs;
};
