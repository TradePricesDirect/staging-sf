import { useMemo, useState } from "react";
import { groupCategories } from "../utils";
import Step from "../Step";
import ProductsTable from "../ProductsTable";

const WorktopOptions = ({ data, open, onToggle }) => {
  const categories = groupCategories(data);

  const [state, setState] = useState({
    category: _.get(categories, "[0].slug", null),
  });

  const handleCategoryChange = (slug) => setState({ ...state, category: slug });

  const products = useMemo(() => {
    return data.filter(({ categories }) => {
      if (!state.category) return true;

      return _.find(categories, ["slug", state.category]);
    });
  }, [data, state]);

  return (
    <Step title="Step 3 - Worktops & Surfaces" open={open} onToggle={onToggle}>
      <ProductsTable
        products={products}
        category={state.category}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        text="Worktops are made to measure and require a free on-site visit to
        determine your exact requirements."
      />
    </Step>
  );
};

export default WorktopOptions;
