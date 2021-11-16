import styles from "./Embed.module.scss";

const Embed = ({ children }) => {
  return <div className={styles.wrap}>{children}</div>;
};

export default Embed;
