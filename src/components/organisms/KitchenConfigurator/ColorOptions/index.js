import clsx from "clsx";
import { faPalette } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownSelect from "components/atoms/DropdownSelect";
import Step from "../Step";
import { PAINT_TO_ORDER_OPTIONS } from "../utils";

import styles from "./ColorOptions.module.scss";

const PAINT_TO_ORDER = "paint-to-order";

const ColorOptions = ({
  open,
  colors,
  onColorChange,
  doorColors,
  cabinetColors,
  onSubmit,
  onToggle,
}) => {
  const isPTO = colors.door === "paint-to-order";

  const hasDoorColor = (isPTO && colors.custom) || (!isPTO && colors.door);
  const canSubmit = hasDoorColor && !!colors.cabinet;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (canSubmit) onSubmit();
  };

  return (
    <Step title="Step 1 - Colour Options" open={open} onToggle={onToggle}>
      <div className={styles.wrap}>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className={styles.label}>Choose a Door Colour</legend>

            <ul className={styles.colors}>
              {doorColors.map(({ name, slug, value }) => (
                <li key={`doorColor-${slug}`} className={styles.colorItem}>
                  {slug === PAINT_TO_ORDER ? (
                    <PaintToOrderSwatch
                      name={name}
                      selected={isPTO}
                      onClick={() => onColorChange("door", slug)}
                    />
                  ) : (
                    <ColorSwatch
                      name={name}
                      slug={slug}
                      value={value}
                      selected={colors.door === slug}
                      onClick={() => onColorChange("door", slug)}
                    />
                  )}
                </li>
              ))}
            </ul>

            {isPTO && (
              <div className={styles.dropdown}>
                <label className={styles.label}>Paint to Order Colour</label>

                <DropdownSelect
                  value={colors.custom}
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
                      selected={colors.cabinet === slug}
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
