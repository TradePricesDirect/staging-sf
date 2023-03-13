import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import QuoteLayout from "layouts/Quote";
import CategoryList from "components/organisms/CategoryList";
import Carousel from "components/organisms/Carousel";

import styles from "./RequestQuoteThankYou.module.scss";

const RequestQuoteThankYouPage = ({ categoriesLevel0, categoriesLevel1 }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="container py-8 text-center">
        <h1 className={styles.title}>
          <strong>Congratulations</strong>{" you're all set..."}
        </h1>

        <p className={styles.intro}>
          We have received your enquiry and will be in touch shortly.
        </p>

        {user ? (
          <div className={styles.buttons}>
            <Link href={paths.account.dashboard} className="btn btn-circle">
              Manage Account
            </Link>

            <Link href={paths.home} className="btn btn-circle">
              Browse Shop
            </Link>

            <Link href={paths.wishlists} className="btn btn-circle">
              Start a Wishlist
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.lead}>
              {`In the meantime, create an account and browse our huge range of
              products from 100's of top brands.`}
            </p>

            <div className={styles.buttons}>
              <Link href={paths.register} className="btn btn-primary">
                Create an Account
              </Link>

              <Link href={paths.home} className="btn btn-outline-primary">
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>

      <CategoryList categories={categoriesLevel0} />
      <Carousel categories={categoriesLevel1} />
    </>
  );
};

RequestQuoteThankYouPage.getLayout = (page) => (
  <QuoteLayout backLink={false}>{page}</QuoteLayout>
);

export default RequestQuoteThankYouPage;
