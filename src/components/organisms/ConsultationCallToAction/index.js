import Link from "next/link";
import Image from "next/image";
import paths from "core/paths";

import styles from "./ConsultationCallToAction.module.scss";

const ConsultationCallToAction = ({
  subtitle,
  title,
  text,
  backgroundImage,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.image}>
        <Image
          src={backgroundImage}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <h4 className={styles.subtitle}>{subtitle}</h4>
          <h2 className={styles.title}>{title}</h2>

          <p>{text}</p>

          <Link href={paths.requestQuote}>
            <a className="btn btn-outline-primary">Book Now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCallToAction;
