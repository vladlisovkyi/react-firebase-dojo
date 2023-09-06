import React, { createContext, useEffect, useMemo, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

// Step 1: Create a context
export const MenuContext = createContext();

// Step 2: Create a ContextMenuProvider component
export function ContextMenuProvider({ children }) {
  const [openMenu, setOpenMenu] = useState(false);
  const matches = useMediaQuery("(min-width: 1280px)");
  const contextValue = useMemo(
    () => ({
      openMenu,
      setOpenMenu,
    }),
    [openMenu]
  );

  useEffect(() => {
    if (matches) setOpenMenu(true);
    if (!matches) setOpenMenu(false);
  }, [matches]);
  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}

// Step 3: Create a custom hook to use the context
