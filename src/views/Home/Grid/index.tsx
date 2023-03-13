import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import clsx from "clsx";
import useIsMobile from "hooks/useIsMobile";
import useIsTablet from "hooks/useIsTablet";
import React, { FC, Children } from "react";
import HowItWorksGridTile from "../HowItWorksGridTile/HowItWorksGridTile";
import IconGridTile from "../IconGridTile/IconGridTile";
import PromoGridTile from "../PromoGridTile";
import styles from "./Grid.module.scss";

type Props = {
  cols?: number;
  height: number;
  header?: string;
  subHeader?: string;
  className?: string;
  sbChildren?: any[];
  bottomMargin?: number;
};

const Grid: FC<{
  blok?: {
    cols?: number;
    height: number;
    header?: string;
    subHeader?: string;
    className?: string;
    sbChildren?: any[];
    bottomMargin?: number;
  };
  cols?: number;
  height: number;
  header?: string;
  subHeader?: string;
  className?: string;
  bottomMargin?: number;
  sbChildren?: any[];
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;
  const {
    sbChildren,
    cols,
    height,
    header,
    subHeader,
    className,
    bottomMargin,
  } = conditionalProps;

  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};

  // use this if using react child nodes
  // const childCount = React.Children.count(children);

  // write a viewport width hook here...
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  // const marginBottom = `clear-${bottomMargin}`;

  return (
    <section
      className={clsx("container-xxl", className)}
      style={{ marginBottom: `${bottomMargin}px` }}
      {...storyblokEditableProps}
    >
      {header && (
        <header className={styles.header}>
          <h4>{header}</h4>
          {subHeader && <p>{subHeader}</p>}
        </header>
      )}

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns:
            isMobile || isTablet
              ? `repeat(1, 1fr)`
              : `repeat(${
                  cols ||
                  sbChildren?.length ||
                  Children.toArray(props.children)?.length
                }, 1fr)`,
          gridAutoRows: `minmax(${height}px, auto)`,
        }}
      >
        {/* {props.children} */}

        {sbChildren?.map((child, index) => (
          <StoryblokComponent blok={child} index={index} key={child._uid} />
        ))}
        {props.children}

        {/* {sbChildren?.map((content, index) => {
          switch (content.component) {
            case "PromoGridTile":
              return <PromoGridTile key={content._uid} {...content} />;
            case "HowItWorksGridTile":
              return (
                <HowItWorksGridTile
                  key={content._uid}
                  {...content}
                  stepIndex={index + 1}
                />
              );
            case "IconGridTile":
              return <IconGridTile key={content._uid} {...content} />;
          }
          return;
        })} */}
      </div>
    </section>
  );
};

export default Grid;
