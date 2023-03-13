import paths from "core/paths";

const categoryPath = (category: string) =>
  paths.category.replace("[slug]", category);

export default categoryPath;
