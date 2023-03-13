import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import clsx from "clsx";
import Button from "components/atoms/Button";
import useIsMobile from "hooks/useIsMobile";
import useIsTablet from "hooks/useIsTablet";
import React, { FC } from "react";
// import HowItWorksGridTile from "../HowItWorksGridTile/HowItWorksGridTile";
// import PromoGridTile from "../PromoGridTile";
import styles from "./Section.module.scss";

const Section: FC<{
  blok?: {
    cols?: number;
    height: number;
    header?: string;
    subHeader?: string;
    className?: string;
    sbChildren?: any[];
    bottomMargin?: number;
    gap?: number;
  };
  cols?: number;
  height: number;
  header?: string;
  subHeader?: string;
  className?: string;
  bottomMargin?: number;
  sbChildren?: any[];
  gap?: number;
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;
  const {
    cols,
    height,
    header,
    subHeader,
    className,
    sbChildren,
    bottomMargin,
    gap,
  } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};

  return (
    <section
      className={clsx("container-xxl d-flex justify-content-center", className)}
      style={{ marginBottom: `${bottomMargin}px`, gap: `${gap}px` }}
      {...storyblokEditableProps}
    >
      {header && (
        <header className={styles.header}>
          <h3>{header}</h3>
          {subHeader && <p>{subHeader}</p>}
        </header>
      )}
      {sbChildren?.map((child, index) => (
        <StoryblokComponent blok={child} index={index} key={child._uid} />
      ))}
    </section>
  );
};

export default Section;
