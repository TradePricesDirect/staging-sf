import clsx from "clsx";
import { FC } from "react";
import styles from "./RichTextEditorContent.module.scss";

const RichTextEditorContent: FC<{
  jsonData: any;
  className?: string;
}> = ({ jsonData, className }) => {
  if (!jsonData) return null;

  const data = typeof jsonData === "string" ? JSON.parse(jsonData) : jsonData;

  return (
    <div className={clsx(styles.body, className)}>
      {data.blocks.map(({ type, id, data: { text, items, style } }) => {
        switch (type) {
          case "paragraph":
            return <p>{text.replace(`�`, "")} </p>;
          case "list":
            const listItems = items.map((item, index) => (
              <li key={`${id}-${index}`} className={styles.listItem}>
                <span className={styles.bullet}>&#x2022;</span>
                <span className={styles.text}>{item}</span>
              </li>
            ));
            return style === "ordered" ? (
              <ol className={styles.list}>{listItems}</ol>
            ) : (
              <ul className={styles.list}>{listItems}</ul>
            );
          default:
            return;
        }
      })}
    </div>
  );
};

export default RichTextEditorContent;
