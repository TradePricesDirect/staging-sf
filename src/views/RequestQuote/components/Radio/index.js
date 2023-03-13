import styles from "./Radio.module.scss";

const Radio = ({ title, text, image, ...other }) => {
  const id = `${other.name}_${other.value}_radio`;

  return (
    <div className={styles.tile}>
      <input id={id} type="radio" className={styles.input} {...other} />
      <label className={styles.content} htmlFor={id}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <div className={styles.inner}>
          <p className={styles.text}>{text}</p>
          <span className={styles.button} color="white">{title}</span>
        </div>

        <img className={styles.icon} src={image} alt="" loading="lazy" />
      </label>
    </div>
  );
};

export default Radio;
