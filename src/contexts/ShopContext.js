import { createContext, useState, useContext } from "react";

export const ShopContext = createContext();

const Provider = ({ shopConfig, children }) => {
  const [state] = useState(shopConfig);

  return <ShopContext.Provider value={state}>{children}</ShopContext.Provider>;
};

export default Provider;

export const useShop = () => useContext(ShopContext);
