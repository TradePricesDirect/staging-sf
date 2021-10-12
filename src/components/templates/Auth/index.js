import styles from "./Auth.module.scss";

const Auth = ({ title, children }) => {
  return (
    <div className={styles.wrap}>
      <div className="container">
        {title && (
          <h2
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}

        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

export default Auth;

export const Separator = ({ text = "OR" }) => {
  return (
    <div className={styles.separator}>
      <hr />
      <span>{text}</span>
      <hr />
    </div>
  );
};
