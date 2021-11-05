import clsx from "clsx";
import { faPalette } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownSelect from "components/atoms/DropdownSelect";
import Step from "../Step";
import { PAINT_TO_ORDER_OPTIONS } from "../utils";

import styles from "./ColorOptions.module.scss";

const ColorOptions = ({
  selectedColors: { door, cabinet, custom },
  paintToOrder,
  doorColors,
  cabinetColors,
  onColorChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const isPaintToOrder = door === paintToOrder?.slug;

  const hasDoorColor = (isPaintToOrder && custom) || (!isPaintToOrder && door);

  const canSubmit = hasDoorColor && cabinet;

  return (
    <Step title="Step 1 - Colour Options" open>
      <div className={styles.wrap}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className={styles.label}>Choose a Door Colour</legend>

            <ul className={styles.colors}>
              {doorColors.map(({ name, slug, value }) => (
                <li key={`doorColor-${slug}`} className={styles.colorItem}>
                  <ColorSwatch
                    name={name}
                    slug={slug}
                    value={value}
                    selected={door === slug}
                    onClick={() => onColorChange("door", slug)}
                  />
                </li>
              ))}

              {paintToOrder && (
                <li className={styles.colorItem}>
                  <PaintToOrderSwatch
                    name={paintToOrder.name}
                    selected={isPaintToOrder}
                    onClick={() => onColorChange("door", paintToOrder.slug)}
                  />
                </li>
              )}
            </ul>

            {isPaintToOrder && (
              <div className={styles.dropdown}>
                <label className={styles.label}>Paint to Order Colour</label>

                <DropdownSelect
                  placeholder="Please select a colour"
                  options={PAINT_TO_ORDER_OPTIONS}
                  onChange={({ value }) => onColorChange("custom", value)}
                />
              </div>
            )}
          </fieldset>

          {hasDoorColor && (
            <fieldset>
              <legend className={styles.label}>Choose a Cabinet Colour</legend>

              <ul className={styles.colors}>
                {cabinetColors.map(({ name, slug, value }) => (
                  <li key={`cabinetColor-${slug}`} className={styles.colorItem}>
                    <ColorSwatch
                      name={name}
                      slug={slug}
                      value={value}
                      selected={cabinet === slug}
                      onClick={() => onColorChange("cabinet", slug)}
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          )}

          {canSubmit && (
            <div className="text-end">
              <button type="submit" className="btn btn-sm btn-outline-primary">
                Next Section
              </button>
            </div>
          )}
        </form>
      </div>
    </Step>
  );
};

export default ColorOptions;

const ColorSwatch = ({ name, slug, value, selected, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.color}>
      <div
        className={clsx(styles.colorSwatch, selected && styles.selected)}
        style={{ background: value }}
        data-color={slug}
      />

      <div>{name}</div>
    </button>
  );
};

const PaintToOrderSwatch = ({ name, selected, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.color}>
      <FontAwesomeIcon
        icon={faPalette}
        className={clsx(styles.icon, selected && styles.selected)}
      />
      <div>{name}</div>
    </button>
  );
};
