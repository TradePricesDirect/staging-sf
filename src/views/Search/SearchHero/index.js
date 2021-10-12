import styles from "./SearchHero.module.scss";

const SearchHero = ({ search, setSearch }) => {
  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.inner}>
          <h1 className={styles.title}>Search Results</h1>

          <p className={styles.text}>
            You searched for: <bdi>{search}</bdi>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
