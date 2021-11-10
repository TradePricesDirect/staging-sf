import { useMemo, useState } from "react";
import _ from "lodash";
import { groupCategories } from "../utils";
import Step from "../Step";
import ProductsTable from "../ProductsTable";

const AccessoryOptions = ({ data, open, onToggle }) => {
  const categories = groupCategories(data);

  const [state, setState] = useState({
    category: _.get(categories, "[0].slug", null),
    subcategory: null,
  });

  const products = useMemo(() => {
    return data.filter(({ categories, subcategories }) => {
      if (!state.category && !state.subcategory) return true;

      const cat = _.find(categories, ["slug", state.category]);

      if (!state.subcategory) return cat;

      const subcat = _.find(subcategories, ["slug", state.subcategory]);

      return cat && subcat;
    });
  }, [data, state]);

  const handleCategoryChange = (slug) => {
    setState({ ...state, category: slug, subcategory: null });
  };

  const handleSubcategoryChange = (slug) => {
    setState({ ...state, subcategory: slug });
  };

  const subcategories = useMemo(() => {
    return _.find(categories, ["slug", state.category])?.subcategories || [];
  }, [state.category, categories]);

  return (
    <Step
      title="Step 4 - Accessories & Finishing Touches"
      open={open}
      onToggle={onToggle}
    >
      <ProductsTable
        products={products}
        category={state.category}
        subcategory={state.subcategory}
        categories={categories}
        subcategories={subcategories}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
      />
    </Step>
  );
};

export default AccessoryOptions;
