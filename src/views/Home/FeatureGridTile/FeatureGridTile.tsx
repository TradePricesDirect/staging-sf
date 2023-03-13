import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storyblokEditable } from "@storyblok/react";
import { icons } from "core/constants";
import { FC } from "react";
import styles from "./FeatureGridTile.module.scss";

const FeatureGridTile: FC<{
  blok?: {
    icon: string;
    bold: string;
    text: string;
  };
  icon: string;
  bold: string;
  text: string;
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;

  const { bold, text, icon } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};
  return (
    <div {...storyblokEditableProps} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <div className={styles.background}></div>
          <FontAwesomeIcon icon={blok ? icons[icon] : icon} />
        </div>
        <div className={styles.text}>
          <p>
            <strong>{bold}</strong>
            {` `}
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureGridTile;
