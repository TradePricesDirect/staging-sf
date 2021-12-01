import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import QuoteLayout from "layouts/Quote";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarouselEndless from "components/organisms/CategoryCarouselEndless";

import styles from "./RequestQuoteThankYou.module.scss";

const RequestQuoteThankYouPage = ({ categoriesLevel0, categoriesLevel1 }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="container py-8 text-center">
        <h1 className={styles.title}>
          <strong>Congratulations</strong> you're all set...
        </h1>

        <p className={styles.intro}>
          We have received your enquiry and will be in touch shortly.
        </p>

        {user ? (
          <div className={styles.buttons}>
            <Link href={paths.account.dashboard}>
              <a className="btn btn-circle">Manage Account</a>
            </Link>

            <Link href={paths.home}>
              <a className="btn btn-circle">Browse Shop</a>
            </Link>

            <Link href={paths.wishlists}>
              <a className="btn btn-circle">Start a Wishlist</a>
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.lead}>
              In the meantime, create an account and browse our huge range of
              products from 100's of top brands.
            </p>

            <div className={styles.buttons}>
              <Link href={paths.register}>
                <a className="btn btn-primary">Create an Account</a>
              </Link>

              <Link href={paths.home}>
                <a className="btn btn-outline-primary">Back to Home</a>
              </Link>
            </div>
          </>
        )}
      </div>

      <CategoryList categories={categoriesLevel0} />
      <CategoryCarouselEndless categories={categoriesLevel1} />
    </>
  );
};

RequestQuoteThankYouPage.getLayout = (page) => (
  <QuoteLayout backLink={false}>{page}</QuoteLayout>
);

export default RequestQuoteThankYouPage;
