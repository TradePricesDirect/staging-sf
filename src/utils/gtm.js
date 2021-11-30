import { useEffect } from "react";
import { useRouter } from "next/router";

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};

export const usePageViewTracking = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);
};
