import styles from "./KitchenConfigurator.module.scss";

const KitchenConfigurator = ({ slug }) => {
  return (
    <div className={styles.wrap}>
      <div className="container py-8">
        <h2 className={styles.title}>Buy Your Complete Kitchen</h2>

        <p>Builder here ({slug})</p>
      </div>
    </div>
  );
};

export default KitchenConfigurator;
