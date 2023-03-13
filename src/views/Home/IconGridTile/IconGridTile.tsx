import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storyblokEditable } from "@storyblok/react";
import { icons } from "core/constants";
import { FC } from "react";
import styles from "./IconGridTile.module.scss";

const IconGridTile: FC<{
  blok?: {
    icon: string;
    header: string;
    subHeader: string;
  };
  icon: string;
  header: string;
  subHeader: string;
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;

  const { header, subHeader, icon } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};
  return (
    <div {...storyblokEditableProps} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icons[icon]} />
        </div>
        <div className={styles.text}>
          <h6>{header}</h6>
          <p>{subHeader}</p>
        </div>
      </div>
    </div>
  );
};

export default IconGridTile;
