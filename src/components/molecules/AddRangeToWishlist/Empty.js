import Link from "next/link";
import paths from "core/paths";

const Empty = () => {
  return (
    <div className="d-grid">
      <p>You have not created any lists...</p>

      <Link href={paths.wishlists} className="btn btn-primary">
        Create a list
      </Link>
    </div>
  );
};

export default Empty;
