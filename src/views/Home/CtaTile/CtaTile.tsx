import Image from "next/image";
import { FC } from "react";
import styles from "./HowItWorksTile.module.scss";

const CtaTile: FC<{
  header: string;
  subHeader?: string;
  stepIndex?: number;
  image: any;
}> = ({ header, subHeader, stepIndex, image }) => {
  return (
    <>
      <div className={styles.container}>
        {image && (
          <div className={styles.image}>
            <Image src={"/images/logos/brand-quooker.png"} fill alt={"123"} />
          </div>
        )}

        <div className={styles.header}>
          <h5>{header}</h5>
          <p>{subHeader}</p>
        </div>
        {stepIndex && (
          <div className={styles.stepIndex}>
            <span>{stepIndex}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CtaTile;
