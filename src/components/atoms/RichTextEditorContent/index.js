import { useRef } from "react";
import EditorJSHTML from "editorjs-html";

const RichTextEditorContent = ({ jsonData }) => {
  const editorHtml = useRef(EditorJSHTML());
  const data = jsonData ? JSON.parse(jsonData) : [];

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: editorHtml.current.parse(data).join(""),
      }}
    />
  );
};

export default RichTextEditorContent;
