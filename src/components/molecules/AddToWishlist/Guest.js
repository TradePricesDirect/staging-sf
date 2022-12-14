import Link from "next/link";
import paths from "core/paths";

const Guest = () => {
  return (
    <div className="d-grid">
      <p>Please sign in or register for an account to begin creating lists.</p>

      <Link href={paths.login} className="btn btn-primary">
        Sign in or Create an Account
      </Link>
    </div>
  );
};

export default Guest;
