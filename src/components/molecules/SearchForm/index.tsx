import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StringParam, useQueryParam } from "use-query-params";
import paths from "core/paths";
import styles from "./SearchForm.module.scss";
import { icons } from "core/constants";

const SearchForm: FC<{ id?: string }> = ({ id }) => {
  const router = useRouter();

  const [search] = useQueryParam("term", StringParam);
  const [term, setTerm] = useState(search || "");

  useEffect(() => {
    setTerm(search || "");
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push({
      pathname: paths.search,
      query: { term },
    });
  };

  return (
    <form
      role="search"
      action={paths.search}
      method="get"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <label htmlFor={id} className={styles.label}>
        <FontAwesomeIcon icon={icons.faSearch} />
        <span className="visually-hidden">Search</span>
      </label>

      <input
        type="search"
        id={id}
        placeholder="I'm looking for..."
        name="term"
        className={clsx("form-control", styles.input)}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <div className={styles.clear}>
        {term && <FontAwesomeIcon icon={icons.faTimes} />}
      </div>
    </form>
  );
};

export default SearchForm;
