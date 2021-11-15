const config = {
  // Kitchens
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
  // Bathrooms
  "basins-pedestals": "/images/category-thumbnails/basins-pedestals.jpg",
  bathrooms: "/images/category-thumbnails/bathrooms.jpg",
  "bathroom-accessories":
    "/images/category-thumbnails/bathroom-accessories.jpg",
  "bathroom-furniture": "/images/category-thumbnails/bathroom-furniture.jpg",
  "bathroom-sinks": "/images/category-thumbnails/bathroom-sinks.jpg",
  "bathroom-taps": "/images/category-thumbnails/bathroom-taps.jpg",
  baths: "/images/category-thumbnails/baths.jpg",
  "bath-panels": "/images/category-thumbnails/bath-panels.jpg",
  radiators: "/images/category-thumbnails/radiators.jpg",
  showers: "/images/category-thumbnails/showers.jpg",
  toilets: "/images/category-thumbnails/toilets.jpg",
};

export default config;

export const getCategoryThumbnail = (slug) => {
  return config.hasOwnProperty(slug) ? { url: config[slug], alt: slug } : null;
};
