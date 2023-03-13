import EditorJSHTML from "editorjs-html";

export const convertToAttributeScalar = (attributes) => {
  return Object.entries(attributes)
    .map(([key, value]) =>
      value.map((attribute) => ({ slug: key, values: [attribute] }))
    )
    .reduce((prev, curr) => [...prev, ...curr], []);
};

export const convertSortByFromString = (sortBy) => {
  if (!sortBy) return null;

  const direction = sortBy.startsWith("-") ? "DESC" : "ASC";

  let field;

  switch (sortBy.replace(/^-/, "")) {
    case "name":
      field = "NAME";
      break;

    case "price":
      field = "MINIMAL_PRICE";
      break;

    default:
      return null;
  }
  return { field, direction };
};

export const convertRichTextToPlainText = (jsonData) => {
  if (!jsonData) return null;

  const editorHtml = EditorJSHTML();

  const data = jsonData ? JSON.parse(jsonData) : [];

  const HTML = editorHtml.parse(data).join("");
  const text = HTML.replace(/<[^>]*>/g, "");

  return text;
};