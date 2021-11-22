import ImageGallery from "./ImageGallery";
import Header from "./Header";
import Content from "./Content";
import KitchenConfigurator from "components/organisms/KitchenConfigurator";
import ConsultationCallToAction from "components/organisms/ConsultationCallToAction";

const KitchenRangePage = ({ range }) => {
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
        title={range.title}
        slug={range.slug}
        doorColors={range.door_colors}
        cabinetColors={range.cabinet_colors}
      />

      <ConsultationCallToAction
        subtitle="Talk to the experts in incredible kitchens"
        title="Book a Free Virtual Consultation"
        text="Whether you're considering your options or ready to get started, our design team is here to help. Start with a free consultation with no commitment or obligation."
        backgroundImage="/images/kitchens/kitchen-wireframe.jpg"
      />
    </>
  );
};

export default KitchenRangePage;
