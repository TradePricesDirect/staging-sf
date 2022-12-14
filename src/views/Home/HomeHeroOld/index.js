import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import useMenuLink from "hooks/useMenuLink";
import paths from "core/paths";
import FeefoBadge from "components/atoms/FeefoBadge";
import FinanceRibbon from "components/atoms/FinanceRibbon";

import styles from "./HomeHero.module.scss";

const HomeHero = () => {
  const { user } = useAuth();
  const openMenu = useMenuLink();

  return (
    <section className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <h6>Get Your Hands On</h6>

          <h1>
            <strong>Kitchens</strong> at Trade Prices
          </h1>

          <p>
            Buy kitchens, bathrooms, boilers, & more at trade prices direct from
            the manufacturer.
          </p>

          <div className={styles.buttons}>
            {user ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={openMenu}
              >
                Shop Now
              </button>
            ) : (
              <Link href={paths.register} className="btn btn-secondary">
                Register & Shop
              </Link>
            )}

            <Link href={paths.requestQuote} className="btn btn-outline-white">
              Request a Quote
            </Link>
          </div>

          <FeefoBadge className={styles.badge} />
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src="/images/home-hero.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
        />

        <FinanceRibbon className={styles.ribbon} />
      </div>
    </section>
  );
};

export default HomeHero;
