import { useMemo, useState } from "react";
import _ from "lodash";
import { StringParam, useQueryParams } from "use-query-params";
import GetHelpCallToAction from "components/molecules/GetHelpCallToAction";
import { StepsEnum } from "./utils";
import ColorOptions from "./ColorOptions";
import UnitOptions from "./UnitOptions";
import WorktopOptions from "./WorktopOptions";
import AccessoryOptions from "./AccessoryOptions";
import Sidebar from "./Sidebar";
import { filterProductsByVariants } from "./utils";

import styles from "./KitchenConfigurator.module.scss";

const KitchenConfigurator = ({ slug, data, doorColors, cabinetColors }) => {
  const [query] = useQueryParams({
    door: StringParam,
    cabinet: StringParam,
    custom: StringParam,
  });

  const [colors, setColors] = useState(query);

  const [step, setStep] = useState(StepsEnum.Color);

  const products = useMemo(
    () => (colors.door ? filterProductsByVariants(data, colors) : []),
    [colors.door, colors.cabinet]
  );

  const [units, worktops, accessories] = useMemo(
    () => [
      _.filter(products, (p) => _.find(p.step, ["slug", "unit"])),
      _.filter(products, (p) => _.find(p.step, ["slug", "worktop"])),
      _.filter(products, (p) => _.find(p.step, ["slug", "accessory"])),
    ],
    [products]
  );

  const handleToggle = (newStep) => setStep(step === newStep ? null : newStep);

  const handleColorChange = (name, value) => {
    let newColors = { ...colors, [name]: value };

    if (name === "door" && value !== "paint-to-order") newColors.custom = null;
    if (name === "door" && value === "paint-to-order") newColors.cabinet = null;

    setColors(newColors);
  };

  const hasColorCombo = colors.door && colors.cabinet;

  return (
    <div className={styles.wrap}>
      <div className="container py-8">
        <h2 className={styles.title}>Buy Your Complete Kitchen</h2>

        <div className="row">
          <div className="col-12 col-lg-8">
            <ColorOptions
              colors={colors}
              doorColors={doorColors}
              cabinetColors={cabinetColors}
              onColorChange={handleColorChange}
              onStepChange={setStep}
              open={step === StepsEnum.Color}
              onToggle={() => handleToggle(StepsEnum.Color)}
              onSubmit={() => handleToggle(StepsEnum.Units)}
            />

            {hasColorCombo && (
              <>
                <UnitOptions
                  data={units}
                  open={step === StepsEnum.Units}
                  onToggle={() => handleToggle(StepsEnum.Units)}
                />

                <WorktopOptions
                  data={worktops}
                  open={step === StepsEnum.Worktops}
                  onToggle={() => handleToggle(StepsEnum.Worktops)}
                />

                <AccessoryOptions
                  data={accessories}
                  open={step === StepsEnum.Accessories}
                  onToggle={() => handleToggle(StepsEnum.Accessories)}
                />
              </>
            )}
          </div>
          <div className="col-12 col-lg-4">
            <div className={styles.sidebar}>
              <Sidebar
                slug={slug}
                colors={colors}
                onColorToggle={() => handleToggle(StepsEnum.Color)}
              />

              <GetHelpCallToAction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenConfigurator;
