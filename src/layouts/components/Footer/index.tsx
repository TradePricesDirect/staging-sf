import Link from "next/link";
import paths from "core/paths";
import Logo from "components/atoms/Logo";
import Newsletter from "components/molecules/Newsletter";
import NavMenu from "./NavMenu";
import ContactDetails from "./ContactDetails";
import BackToTop from "./BackToTop";
import FooterBottom from "./FooterBottom";

import styles from "./Footer.module.scss";
import clsx from "clsx";
import { FC } from "react";

const Footer: FC<{ menus: any; className?: string }> = ({
  menus,
  className,
}) => {
  return (
    <footer className={clsx(styles.wrap, className)}>
      <div className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <Logo className={styles.logo} />

              <p className={styles.strapline}>
                <Link href={paths.login}>{"Register with TPD"}</Link>
                {" and get access to 100's of top brands at trade prices."}
              </p>

              <Newsletter />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <NavMenu menu={menus.about} />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <NavMenu menu={menus.support} />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <NavMenu menu={menus.shop} />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <ContactDetails />
            </div>
          </div>

          <BackToTop />
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
