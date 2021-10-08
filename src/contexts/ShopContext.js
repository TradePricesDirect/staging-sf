import { createContext, useState, useContext } from "react";

const defaultContext = {
  displayGrossPrices: false,
};

export const ShopContext = createContext(defaultContext);

const Provider = ({ children }) => {
  const [state] = useState(defaultContext);

  return <ShopContext.Provider value={state}>{children}</ShopContext.Provider>;
};

export default Provider;

export const useShop = () => useContext(ShopContext);
