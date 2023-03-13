import { StoryblokComponent } from "@storyblok/react";

const HomePage = ({ carousels, brands, story: { content } }) => (
  <StoryblokComponent blok={content} carousels={carousels} brands={brands} />
);

export default HomePage;
