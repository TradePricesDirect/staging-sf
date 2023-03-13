import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { FC } from "react";
import styles from "./HowItWorksGridTile.module.scss";

const HowItWorksGridTile: FC<{
  blok?: {
    header: string;
    subHeader?: string;
    step?: boolean;
  };
  header?: string;
  subHeader?: string;
  step?: boolean;
  index: number;
}> = (props) => {
  const { blok, index } = props;
  const conditionalProps = blok ? blok : props;
  const { header, subHeader, step } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};
  return (
    <div {...storyblokEditableProps} className={styles.container}>
      <div className={styles.header}>
        <h5>{header}</h5>
        <p>{subHeader}</p>
      </div>
      {step && (
        <div className={styles.stepIndex}>
          <span>{index + 1}</span>
        </div>
      )}
    </div>
  );
};

export default HowItWorksGridTile;
