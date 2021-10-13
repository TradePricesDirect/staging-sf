import EditorJSHTML from "editorjs-html";

const RichTextEditorContent = ({ jsonData }) => {
  if (!jsonData) return null;

  const editorHtml = EditorJSHTML();

  const data = jsonData ? JSON.parse(jsonData) : [];

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: editorHtml.parse(data).join(""),
      }}
    />
  );
};

export default RichTextEditorContent;
