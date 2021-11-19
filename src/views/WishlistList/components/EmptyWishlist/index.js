import Link from "next/link";
import paths from "core/paths";

const EmptyWishlist = () => {
  return (
    <div className="py-8 text-center">
      <h3>Start Building Your List!</h3>
      <p>Browse our wide range of products and add items to lists.</p>

      <Link href={paths.shop}>
        <a className="btn btn-primary">Continue Shopping</a>
      </Link>
    </div>
  );
};

export default EmptyWishlist;
