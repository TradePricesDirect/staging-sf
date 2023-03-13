import localFont from "@next/font/local";
export const mazzard = localFont({
  src: [
    {
      path: "../../fonts/mazzard_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/mazzard_semi_bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/mazzard_bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/mazzard_extra_bold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

export default mazzard;
