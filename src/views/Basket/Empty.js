import Link from "next/link";
import paths from "core/paths";

const Empty = () => {
  return (
    <>
      <p>Your basket is currently empty.</p>

      <Link href={paths.shop}>
        <a className="btn btn-primary">Return to Shop</a>
      </Link>
    </>
  );
};

export default Empty;
