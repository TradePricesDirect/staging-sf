import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-light-svg-icons";

import styles from "./SearchForm.module.scss";

const SearchForm = ({ id }) => {
  return (
    <form role="search" action="/search" method="get" className={styles.form}>
      <label htmlFor={id} className={styles.label}>
        <FontAwesomeIcon icon={faSearch} />
        <span className="visually-hidden">Search</span>
      </label>

      <input
        type="search"
        id={id}
        placeholder="I'm looking for..."
        defaultValue=""
        name="s"
        className={clsx("form-control", styles.input)}
      />
    </form>
  );
};

export default SearchForm;
