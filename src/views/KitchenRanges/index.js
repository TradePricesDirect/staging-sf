import MetaTags from "components/atoms/MetaTags";
import Page from "./Page";
import { useQueryParam } from "use-query-params";
import { FilterQuerySet } from "utils/collections";
import { filtersChangeHandler } from "./utils";
import { useMemo } from "react";
import _ from "lodash";

const KitchenRanges = ({ ranges: data }) => {
  const [filters, setFilters] = useQueryParam("filters", FilterQuerySet);

  const handleFiltersChange = filtersChangeHandler(filters, setFilters);

  const ranges = useMemo(() => {
    return data.filter((range) => {
      const matches = Object.entries(filters).filter(([slug, values]) => {
        return range.attributes.find(
          (attribute) =>
            _.isEqual(attribute.attribute.slug, `kitchen-range-${slug}`) &&
            _.intersection(_.map(attribute.values, "slug"), values).length > 0
        );
      });

      return matches.length === Object.keys(filters).length;
    });
  }, [data, filters]);

  return (
    <>
      <MetaTags
        title="Kitchen Ranges"
        meta={{ "og:type": "product.category" }}
      />

      <Page
        ranges={ranges}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
    </>
  );
};

export default KitchenRanges;
