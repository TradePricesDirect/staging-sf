import GetHelpCallToAction from "components/molecules/GetHelpCallToAction";
import ColorOptions from "./ColorOptions";

import styles from "./KitchenConfigurator.module.scss";

const Configurator = ({
  selectedColors,
  doorColors,
  cabinetColors,
  paintToOrder,
  onColorChange,
}) => {
  return (
    <div className={styles.wrap}>
      <div className="container py-8">
        <h2 className={styles.title}>Buy Your Complete Kitchen</h2>

        <div className="row">
          <div className="col-12 col-md-8">
            <ColorOptions
              selectedColors={selectedColors}
              paintToOrder={paintToOrder}
              doorColors={doorColors}
              cabinetColors={cabinetColors}
              onColorChange={onColorChange}
            />
          </div>
          <div className="col-12 col-md-4">
            <GetHelpCallToAction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
