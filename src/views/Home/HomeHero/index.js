import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import useMenuLink from "hooks/useMenuLink";
import paths from "core/paths";
import FinanceRibbon from "components/atoms/FinanceRibbon";
import VideoModal from "components/molecules/VideoModal";
import HeroImage from "./image.svg";

import styles from "./HomeHero.module.scss";

const HomeHero = () => {
  const { user } = useAuth();
  const openMenu = useMenuLink();

  return (
    <section className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.body}>
          <h6>{"The Wait is Finally Over"}</h6>

          <h1>{"Welcome to The Future of Home Improvement"}</h1>

          <p>
            {`We're the nation's first online, consumer-focused home improvement
            retailer and builders merchant.`}
          </p>

          <p>
            {`Revolutionising the industry and passing the savings onto you -
            let's build it together.`}
          </p>

          <div className={styles.buttons}>
            {user ? (
              <button
                type="button"
                className="btn btn-primary me-sm-4"
                onClick={openMenu}
              >
                {"Register & Shop"}
              </button>
            ) : (
              <Link href={paths.register} className="btn btn-primary me-sm-4">
                {"Register & Shop"}
              </Link>
            )}

            <VideoModal />
          </div>
        </div>
      </div>
      <div className={styles.imageWrap}>
        <HeroImage className={styles.image} />

        <FinanceRibbon className={styles.ribbon} />
      </div>
    </section>
  );
};

export default HomeHero;
