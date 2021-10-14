import clsx from "clsx";
import Thumbnail from "components/molecules/Thumbnail";
import { useProductVariantSelection } from "./utils";

import styles from "./ProductVariantSelection.module.scss";
import DropdownSelect from "components/atoms/DropdownSelect";

const ProductVariantSelection = (props) => {
  const { attributes, selectedAttributes, onAttributeChange } =
    useProductVariantSelection(props);

  return (
    <div className={styles.wrap}>
      {Object.values(attributes).map(({ attribute, values }) => {
        const { id, slug } = attribute;

        const selectedValueId = selectedAttributes[id];

        const selectedValue = selectedValueId
          ? values.find((value) => value.id === selectedValueId)
          : null;

        return (
          <div key={id} className={styles.variant}>
            <h4 className={styles.label}>
              {attribute.name}: <span>{selectedValue?.name}</span>
            </h4>

            {slug === "colour" ? (
              <AttributeValuesThumbnails
                id={id}
                values={values}
                selected={selectedValueId}
                onAttributeChange={onAttributeChange}
              />
            ) : (
              <AttributeValuesDropdown
                id={id}
                values={values}
                selected={selectedValueId}
                onAttributeChange={onAttributeChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariantSelection;

const AttributeValuesThumbnails = ({
  id,
  values,
  selected,
  onAttributeChange,
}) => {
  return (
    <ul className={styles.thumbs}>
      {values.map(({ id: valueId, thumbnail }) => {
        return (
          <button
            key={valueId}
            className={clsx(
              styles.thumb,
              valueId === selected && styles.selected
            )}
            onClick={() => onAttributeChange(id, valueId)}
          >
            <Thumbnail thumbnail={thumbnail} />
          </button>
        );
      })}
    </ul>
  );
};

const AttributeValuesDropdown = ({
  id,
  values,
  selected,
  onAttributeChange,
}) => {
  const options = values.map(({ name, id }) => ({ label: name, value: id }));

  return (
    <div className={styles.dropdown}>
      <DropdownSelect
        name="test"
        value={options.find(({ value }) => value === selected)}
        options={options}
        onChange={({ value }) => onAttributeChange(id, value)}
      />
    </div>
  );
};
