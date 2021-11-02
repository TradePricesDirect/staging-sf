import clsx from "clsx";
import KitchenRangeFilters from "components/organisms/KitchenRangeFilters";
import KitchenRangeTile from "components/molecules/KitchenRangeTile";

import styles from "./KitchenRangesPage.module.scss";

const Page = ({ ranges, filters, onFiltersChange }) => {
  return (
    <div className={styles.wrap}>
      <div className={clsx("container py-8", styles.container)}>
        <h1 className={styles.title}>Browse Complete Kitchens</h1>

        <KitchenRangeFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
        />

        {!ranges.length && <p>No kitchen ranges matching them filters.</p>}

        {ranges.map((range) => (
          <KitchenRangeTile key={range.id} range={range} />
        ))}
      </div>
    </div>
  );
};

export default Page;
