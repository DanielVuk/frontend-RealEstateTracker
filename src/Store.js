import React, { useState } from "react";

const initialState = {
  user: null,
  loading: false,
};

const Context = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export { Store, Context, initialState };
