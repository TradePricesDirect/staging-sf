import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRaindrops,
  faSparkles,
  faTemperatureFrigid,
  faThermometerFull,
} from "@fortawesome/pro-light-svg-icons";

import quookerImage from "./quooker.jpg";

import styles from "./Quooker.module.scss";

const Quooker = () => {
  return (
    <section className={styles.wrap}>
      <div className="row align-items-center">
        <div className="col-md order-md-1">
          <div className={styles.content}>
            <h6>Featured Product</h6>

            <h2>Pure Convenience at Unbeatable Prices</h2>

            <p>
              Hot, cold, sparkling and filtered water on demand, this tap from
              Quooker has become an indispensable tool in kitchens all over the
              world.
            </p>
            <p>
              Get exclusive pricing on the Quooker range of products when you
              shop with Trade Prices Direct.
            </p>

            <ul className={styles.icons}>
              <li>
                <FontAwesomeIcon
                  icon={faThermometerFull}
                  size="2x"
                  style={{ color: "#ca003b" }}
                />
                <div>Boiling</div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faTemperatureFrigid}
                  size="2x"
                  style={{ color: "#5099d8" }}
                />
                <div>Cold</div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faSparkles}
                  size="2x"
                  style={{ color: "#79cef4" }}
                />
                <div>Sparkling</div>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faRaindrops}
                  size="2x"
                  style={{ color: "#2b89d9" }}
                />
                <div>Filtered</div>
              </li>
            </ul>

            <Link href="/brands/quooker">
              <a className="btn btn-outline-primary">Shop Quooker</a>
            </Link>
          </div>
        </div>
        <div className="col-md order-md-0">
          <Image src={quookerImage} alt="Quooker" />
        </div>
      </div>
    </section>
  );
};

export default Quooker;
