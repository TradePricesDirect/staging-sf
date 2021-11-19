import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView } from "react-intersection-observer";
import Embed from "components/organisms/Embed";

import styles from "./FeaturedTile.module.scss";

const FeaturedTile = ({
  image,
  video,
  subtitle,
  title,
  children,
  icons,
  button,
}) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  return (
    <section ref={ref} className={styles.wrap}>
      <div className="row align-items-center">
        <div className="col-md order-md-1">
          <div className={styles.content}>
            <h6>{subtitle}</h6>

            <h2>{title}</h2>

            {children}

            {icons ? (
              <ul className={styles.icons}>
                {icons.map(({ label, icon, color }) => (
                  <li key={`${label}-${color}`}>
                    <FontAwesomeIcon icon={icon} size="2x" style={{ color }} />
                    <div>{label}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <br />
            )}

            <Link href={button.href}>
              <a className="btn btn-outline-primary">{button.name}</a>
            </Link>
          </div>
        </div>
        <div className="col-md order-md-0">
          {video && inView && <Embed>{video}</Embed>}

          {image && <Image alt={title} {...image} />}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTile;
