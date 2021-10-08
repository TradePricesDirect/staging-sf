import clsx from "clsx";
import styles from "./FeefoBadge.module.scss";

const FeefoBadge = ({
  url = "https://www.feefo.com/reviews/tradepricesdirect-com",
  src = "https://api.feefo.com/api/logo?merchantidentifier=tradepricesdirect-com",
  title = "See what our customers say about us",
  className,
}) => {
  return (
    <div className={clsx(styles.badge, className)}>
      <a href={url} target="_blank">
        <img alt="Feefo logo" src={src} title={title} />
      </a>
    </div>
  );
};

export default FeefoBadge;
