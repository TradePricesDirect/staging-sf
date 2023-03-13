import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { FC } from "react";

const Page: FC<{
  blok: any;
  carousels: any[];
  brands: any[];
}> = ({ blok, carousels, brands }) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((child) => {
        const { component, _uid, type } = child;
        if (component === "DataCarousel" && carousels[_uid]?.length) {
          let data = carousels[_uid];
          if (type === "brands") {
            data = brands;
          }
          return <StoryblokComponent blok={child} key={_uid} data={data} />;
        }
        return <StoryblokComponent blok={child} key={_uid} />;
      })}
    </main>
  );
};

export default Page;
