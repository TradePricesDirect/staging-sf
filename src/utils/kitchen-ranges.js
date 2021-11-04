import _ from "lodash";

export const formatKitchenRangeData = (range) => {
  let { metadata: stats, ...details } = range;

  const subtitle = stats.find((stat) => stat.key === "Subtitle");

  // Remove internally used keys
  const removeKeys = ["Kitchen Range", "Kitchen Range Slug", "Subtitle"];
  stats = stats.filter((stat) => removeKeys.indexOf(stat.key) < 0);

  // Order stats
  const statsOrder = [
    "Product Description",
    "Product Finish",
    "Base Material",
    "Covering Material",
  ];

  stats = stats.slice().sort((a, b) => {
    let aIndex = statsOrder.indexOf(a.key);
    let bIndex = statsOrder.indexOf(b.key);

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  return {
    ...details,
    stats,
    subtitle: subtitle?.value || "",
  };
};
