import WishlistCreate from "../WishlistCreate";

import styles from "./WishlistEmpty.module.scss";

const WishlistEmpty = () => {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>My Lists</h2>

      <p className="mb-8">
        Organise your next home renovation by saving your favourite items to a
        list.
      </p>

      <WishlistCreate />
    </div>
  );
};

export default WishlistEmpty;
