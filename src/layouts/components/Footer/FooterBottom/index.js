import clsx from "clsx";
import Link from "next/link";
import paths from "paths";

import styles from "./FooterBottom.module.scss";

const FooterBottom = () => {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={clsx("row", styles.row)}>
          <div className="col-md-auto">
            <small className={styles.copyright}>
              &copy; 2021 TradePricesDirect.com | All rights reserved
            </small>
          </div>
          <div className="col-md-auto">
            <ul className={styles.menu}>
              <li>
                <Link href={paths.privacy}>
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href={paths.terms}>
                  <a>Terms & Conditions</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p
          className={styles.trademark}
        >{`TradePricesDirect.com is the trading name White Mansion Ltd is authorised and regulated by the Financial Conduct Authority. FCA register No. 917875. Finance options are provided a panel of lenders. Finance available subject to status. Terms and conditions apply. TradePricesDirect.com acts as a credit broker and is not a lender. Any credit is subject to status, affordability and a credit check. TradePricesDirect.com Trademark No. UK00003275363 is a trading name of White Mansion Ltd a company registered in United Kingdom. Registered number: 11990071. VAT No. GB 336 4322 16. Registered office: 43 Berkeley Square, London W1J 5AP.`}</p>
      </div>
    </div>
  );
};

export default FooterBottom;
