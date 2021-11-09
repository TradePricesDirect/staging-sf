import ImageGallery from "./ImageGallery";
import Header from "./Header";
import Content from "./Content";
import KitchenConfigurator from "components/organisms/KitchenConfigurator";
import ConsultationCallToAction from "components/organisms/ConsultationCallToAction";

const KitchenRangePage = ({ range, products }) => {
  return (
    <>
      <div className="position-relative">
        <ImageGallery images={range.images} />

        <Header title={range.title} subtitle={range.subtitle} />
      </div>

      <Content
        content={range.content}
        stats={range.stats}
        colors={range.door_colors}
      />

      <KitchenConfigurator
        data={products}
        doorColors={range.door_colors}
        cabinetColors={range.cabinet_colors}
      />

      <ConsultationCallToAction />
    </>
  );
};

export default KitchenRangePage;
