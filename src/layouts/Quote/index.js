import BaseLayout from "layouts/Base";
import BackLink from "layouts/components/BackLink";

import styles from "./QuoteLayout.module.scss";

const QuoteLayout = ({ children, backLink = true }) => {
  return (
    <BaseLayout>
      <main id="main" className={styles.wrap}>
        {backLink && <BackLink />}

        {children}
      </main>
    </BaseLayout>
  );
};

export default QuoteLayout;
