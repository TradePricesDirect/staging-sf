import Link from "next/link";
import paths from "paths";
import Logo from "components/atoms/Logo";
import Newsletter from "components/molecules/Newsletter";
import NavMenu from "./NavMenu";
import ContactDetails from "./ContactDetails";
import BackToTop from "./BackToTop";
import FooterBottom from "./FooterBottom";
import menuConfig from "./menuConfig";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrap}>
      <div className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <Logo className={styles.logo} />

              <p className={styles.strapline}>
                <Link href={paths.login}>
                  <a>Register with TPD</a>
                </Link>{" "}
                and get access to 1000's of top brands at trade prices.
              </p>

              <Newsletter />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <NavMenu {...menuConfig.about} />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <NavMenu {...menuConfig.support} />
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <NavMenu {...menuConfig.shop} />
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
