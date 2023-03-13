import { StoryblokComponent } from "@storyblok/react";

const ContentPage = ({ carousels, brands, story: { content } }) => (
  <StoryblokComponent blok={content} carousels={carousels} brands={brands} />
);

export default ContentPage;
