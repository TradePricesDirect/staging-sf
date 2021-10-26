import Link from "next/link";
import { useAuth } from "@saleor/sdk";
import paths from "core/paths";
import QuoteLayout from "layouts/Quote";
import CategoryList from "components/organisms/CategoryList";
import CategoryCarousel from "components/organisms/CategoryCarousel";

import styles from "./RequestQuoteThankYou.module.scss";

const RequestQuoteThankYouPage = ({ categories }) => {
  const { user } = useAuth();

  const level0 = categories?.level0?.edges.map((e) => e.node) || [];
  const level1 = categories?.level1?.edges.map((e) => e.node) || [];

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

            <Link href={paths.shop}>
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
              products from 1000's of top brands.
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

      <CategoryList categories={level0} />
      <CategoryCarousel categories={level1} />
    </>
  );
};

RequestQuoteThankYouPage.getLayout = (page) => (
  <QuoteLayout backLink={false}>{page}</QuoteLayout>
);

export default RequestQuoteThankYouPage;
