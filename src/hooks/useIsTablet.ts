import { useLayoutEffect, useState } from "react";
import debounce from "lodash/debounce";

const useIsTablet = (): boolean => {
  const [isTablet, setIsTablet] = useState(false);

  useLayoutEffect(() => {
    // const { innerWidth, addEventListener, removeEventListener } = window;
    const updateSize = (): void => {
      setIsTablet(window.innerWidth < 1200 && window.innerWidth >= 576);
    };
    window.addEventListener("resize", debounce(updateSize, 10));
    updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isTablet;
};

export default useIsTablet;
