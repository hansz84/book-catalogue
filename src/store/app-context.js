import React, { useEffect, useState } from "react";

const AppContext = React.createContext({
  categoryId: 0,
  reload: false,
  setCategoryId: () => {},
});

export const AppContextProvider = (props) => {
  const [reload, setReload] = useState(false);
  const [catId, setCatId] = useState(0);

  const handleCategory = (id) => {
    setCatId(id);
  };

  useEffect(() => {
    setReload(true);
  }, [catId]);

  const contextValue = {
    categoryId: catId,
    reload: reload,
    setCategoryId: handleCategory,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
