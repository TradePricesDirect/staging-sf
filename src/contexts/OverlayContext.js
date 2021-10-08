import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const defaultContext = { type: null };

export const OverlayContext = createContext(defaultContext);

const Provider = ({ children }) => {
  const router = useRouter();

  const [state, setState] = useState(defaultContext);

  // Close on route change
  useEffect(() => {
    router.events.on("routeChangeStart", hide);

    return () => {
      router.events.off("routeChangeStart", hide);
    };
  }, []);

  const show = (type) => {
    setState({ type });
    document.body.style.overflow = "hidden";
  };

  const hide = () => {
    setState({ type: null });
    document.body.style.overflow = "";
  };

  return (
    <OverlayContext.Provider value={{ ...state, show, hide }}>
      {children}
    </OverlayContext.Provider>
  );
};

export default Provider;

export const useOverlay = () => useContext(OverlayContext);
