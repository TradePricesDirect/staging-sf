import styles from "./SkipNavigation.module.scss";

export default function SkipNavigation() {
  return (
    <div className={styles.wrap}>
      <a href="#main" className="btn btn-sm btn-primary">
        Skip to content
      </a>
    </div>
  );
}
