import Link from "next/link";
import Image from "next/image";
import { SUPPORT_PHONE } from "core/config";
import paths from "core/paths";

import styles from "./GetStarted.module.scss";

const GetStarted = () => {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 order-md-2">
            <div className={styles.content}>
              <h2 className={styles.title}>To get started you'll need</h2>

              <p>
                Please ensure you have the following information available
                before you start completing the application form:
              </p>

              <ul className={styles.list}>
                <li>Please ensure you have full company/proprietor details</li>
                <li>
                  Your date of birth, contact telephone numbers and email
                  address
                </li>
                <li>A company letterhead</li>
                <li>Company registration number where applicable</li>
                <li>
                  For Sole Traders/Partnerships only: Provide evidence of your
                  home address (include a utility/phone bill or bank, building
                  society or credit card statement from the last 3 months)
                </li>
              </ul>

              <p className="mb-6">
                If you require any assistance during your trade account
                application process, please do not hesitate to call our Online
                Support Team on{" "}
                <a href={`tel:${SUPPORT_PHONE.replace(/ /g, "")}`}>
                  {SUPPORT_PHONE}
                </a>
                .
              </p>

              <div className="text-center text-md-start">
                <Link href={paths.register}>
                  <a className="btn btn-primary">Register For Free</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 text-center order-md-1">
            <Image
              src="/icons/tradesperson/trade-banner.svg"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
