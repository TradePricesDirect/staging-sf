import { StoryblokComponent } from "@storyblok/react";
import clsx from "clsx";
import Accordion from "components/molecules/Accordion";
import { FC } from "react";

import styles from "./FAQ.module.scss";

const FAQ: FC<{
  blok?: {
    header?: string;
    _uid: string;
    children: any[];
  };
  header?: string;
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;
  const { header, children } = conditionalProps;
  return (
    <div className={styles.wrap}>
      <div className={clsx("container", styles.container)}>
        {header && <h2 className={styles.title}>{header}</h2>}
        {blok &&
          (children as any[])?.map((child) => (
            <StoryblokComponent blok={child} key={child._uid} />
          ))}
      </div>
    </div>
  );
};

export default FAQ;
