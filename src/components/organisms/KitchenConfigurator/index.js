import { useMemo, useState } from "react";
import { ColorsEnum } from "core/colors";
import Configurator from "./Configurator";
import { useProductsQuery } from "./queries";

const StepsEnum = {
  Color: "color",
  Units: "unit",
  Accessories: "accessories",
};

const KitchenConfigurator = ({ slug, ...colorOptions }) => {
  const [state, setState] = useState({
    colors: {
      door: null,
      cabinet: null,
      custom: null,
    },
    step: StepsEnum.Color,
    category: null,
    subcategory: null,
  });

  // const { data, loading } = useProductsQuery(
  //   {
  //     range: slug,
  //     step,
  //     category,
  //     subcategory,
  //   },
  //   colors
  // );

  // const [products, numberOfProducts] = useMemo(
  //   () => [
  //     data?.products?.edges.map((e) => e.node) || [],
  //     data?.products?.totalCount || 0,
  //   ],
  //   [data]
  // );

  // console.log(products);
  // console.log(numberOfProducts);

  const [paintToOrder, doorColors, cabinetColors] = useMemo(
    () => [
      colorOptions.doorColors.find(
        (color) => color.slug === ColorsEnum.PaintToOrder.slug
      ),
      colorOptions.doorColors.filter(
        (color) => color.slug !== ColorsEnum.PaintToOrder.slug
      ) || [],
      colorOptions.cabinetColors,
    ],
    [colorOptions]
  );

  const handleColorChange = (type, color) => {
    let colors = { ...state.colors };

    colors[type] = color;

    if (type === "door" && color !== "paint-to-order") colors.custom = null;

    setState({ ...state, colors });
  };

  return (
    <Configurator
      selectedColors={state.colors}
      doorColors={doorColors}
      cabinetColors={cabinetColors}
      paintToOrder={paintToOrder}
      onColorChange={handleColorChange}
    />
  );
};

export default KitchenConfigurator;
