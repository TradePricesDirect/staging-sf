import clsx from "clsx";
import BaseLayout from "layouts/Base";
import BackLink from "layouts/components/BackLink";

import styles from "./QuoteLayout.module.scss";
import font from "../../core/fonts";

const QuoteLayout = ({ children, backLink = true }) => {
  return (
    <BaseLayout>
      <main id="main" className={clsx(styles.wrap, font.className)}>
        {/* {backLink && <BackLink />} */}

        {children}
      </main>
    </BaseLayout>
  );
};

export default QuoteLayout;
