import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import UserWishlists from "./components/UserWishlists";
import UserResults from "./components/UserResults";

const Page = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const handleReset = () => {
    setSearch("");
    setUser(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Find a List</h2>

      {user ? (
        <UserWishlists userId={user} onReset={handleReset} />
      ) : (
        <>
          <SearchForm onChange={setSearch} />
          <UserResults search={search} onClick={setUser} />
        </>
      )}
    </div>
  );
};

export default Page;
