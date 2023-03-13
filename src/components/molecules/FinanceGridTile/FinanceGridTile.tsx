import { storyblokEditable } from "@storyblok/react";
import Button from "components/atoms/Button";
import { icons } from "core/constants";
import Image from "next/image";
import { FC } from "react";
import styles from "./FinanceGridTile.module.scss";

const FinanceGridTile: FC<{
  blok?: {
    header: string;
    subHeader?: string;
    min?: number;
    max?: number;
    path?: string;
    image?: any;
  };
  header?: string;
  subHeader?: string;
  min?: number;
  max?: number;
  path?: string;
  image?: any;
}> = (props) => {
  const { blok } = props;
  const conditionalProps = blok ? blok : props;
  const { header, subHeader, min, max, path, image } = conditionalProps;
  const storyblokEditableProps = blok ? { ...storyblokEditable(blok) } : {};
  return (
    <div {...storyblokEditableProps} className={styles.container}>
      <div className={styles.image}>
        {image && <Image src={image.filename} alt={image.alt} fill />}
      </div>
      <div className={styles.content}>
        <div className={styles.rangePill}>
          <span>
            {min && max ? (
              <>
                {`£${min}`}
                {" to "}
                {`£${max}`}
              </>
            ) : (
              <>{"Call for a quote"}</>
            )}
          </span>
        </div>
        <div className={styles.header}>
          <h5>{header}</h5>
          <p>{subHeader}</p>
        </div>
      </div>
      <div className={styles.button}>
        <Button label={"Learn More"} path={path} icon={icons.faArrowRight} />
      </div>
    </div>
  );
};

export default FinanceGridTile;
