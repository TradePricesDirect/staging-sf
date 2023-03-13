import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import styles from "./FeatureTile.module.scss";
import { FC } from "react";
import Button from "components/atoms/Button";
import Pill from "components/atoms/Pill/Pill";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeatureTile: FC<{
  icon: IconDefinition;
  header: string;
  subHeader: string;
}> = ({ icon, header, subHeader }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={styles.text}>
          <h6>{header}</h6>
          <p>{subHeader}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureTile;
