import Link from "next/link";
import Image from "next/image";
import paths from "core/paths";

import styles from "./ConsultationCallToAction.module.scss";

const ConsultationCallToAction = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.image}>
        <Image
          src="/images/kitchen-wireframe.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <h4 className={styles.subtitle}>
            Talk to the experts in incredible kitchens
          </h4>
          <h2 className={styles.title}>Book a Free Virtual Consultation</h2>

          <p>
            Whether you're considering your options or ready to get started, our
            design team is here to help. Start with a free consultation with no
            commitment or obligation.
          </p>

          <Link href={paths.requestQuote}>
            <a className="btn btn-outline-primary">Book Now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCallToAction;
