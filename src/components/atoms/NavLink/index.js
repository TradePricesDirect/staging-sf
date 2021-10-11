import Link from "next/link";
import paths from "core/paths";

const NavLink = ({ item, children, ...props }) => {
  const { name, url, category, collection, page } = item;

  const link = (url) => (
    <Link passHref href={url}>
      <a {...props}>
        {name}
        {children}
      </a>
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
        {children}
      </a>
    );
  }
  if (category) {
    return link(paths.category.replace("[slug]", category.slug));
  }
  if (collection) {
    return link(paths.collection.replace("[slug]", collection.slug));
  }
  if (page) {
    return link(paths.page.replace("[slug]", page.slug));
  }

  return (
    <span {...props}>
      {name}
      {children}
    </span>
  );
};

export default NavLink;
