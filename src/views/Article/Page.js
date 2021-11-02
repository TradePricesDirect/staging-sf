import RichTextEditorContent from "components/atoms/RichTextEditorContent";

const Page = ({ page }) => {
  return (
    <div className="container py-4">
      <h1>{page.title}</h1>

      <RichTextEditorContent jsonData={page.content} />
    </div>
  );
};

export default Page;
