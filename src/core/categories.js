const config = {
  appliances: "/images/category-thumbnails/appliances.jpg",
  "coffee-machines": "/images/category-thumbnails/cofee-machines.jpg",
  cookers: "/images/category-thumbnails/cookers.jpg",
  dishwashers: "/images/category-thumbnails/dishwashers.jpg",
  flooring: "/images/category-thumbnails/flooring.jpg",
  fridges: "/images/category-thumbnails/fridges.jpg",
  "kitchen-sinks": "/images/category-thumbnails/kitchen-sinks.jpg",
  "kitchen-taps": "/images/category-thumbnails/kitchen-taps.jpg",
  laundry: "/images/category-thumbnails/laundry.jpg",
  ovens: "/images/category-thumbnails/ovens.jpg",
  quooker: "/images/category-thumbnails/quooker.jpg",
  "waste-disposals": "/images/category-thumbnails/waste-disposals.jpg",
};

export default config;

export const getCategoryThumbnail = (slug) => {
  return config.hasOwnProperty(slug) ? { url: config[slug], alt: slug } : null;
};
