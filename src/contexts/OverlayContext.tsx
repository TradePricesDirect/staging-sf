import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
type OverlayType = string | null;

export const OverlayContext = createContext<{
  type: OverlayType;
  show(type: OverlayType): void;
  hide(): void;
}>({
  type: null,
  show: () => {},
  hide: () => {},
});

const Provider = ({ children }) => {
  const router = useRouter();

  const [state, setState] = useState<{ type: OverlayType }>({
    type: null,
  });

  // Close on route change
  useEffect(() => {
    router.events.on("routeChangeStart", hide);

    return () => {
      router.events.off("routeChangeStart", hide);
    };
  }, [router.events]);

  const show = (type: OverlayType) => {
    setState({ type });
    // document.body.style.overflow = "hidden";
  };

  const hide = () => {
    setState({ type: null });
    // document.body.style.overflow = "";
  };

  return (
    <OverlayContext.Provider value={{ ...state, show, hide }}>
      {children}
    </OverlayContext.Provider>
  );
};

export default Provider;

export const useOverlay = () => useContext(OverlayContext);
