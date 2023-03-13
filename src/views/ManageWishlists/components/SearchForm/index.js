import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "core/constants";

import styles from "./SearchForm.module.scss";

const SearchForm = ({ onChange }) => {
  const debounced = useDebouncedCallback(onChange, 500);

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={styles.form}
    >
      <label htmlFor="user-search" className={styles.label}>
        <FontAwesomeIcon icon={icons.faSearch} />
        <span className="visually-hidden">Search</span>
      </label>

      <input
        type="search"
        id="user-search"
        placeholder="Search customer"
        className={clsx("form-control", styles.input)}
        onChange={(e) => debounced(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
