import React from "react";

const Context = React.createContext<{ state: any; setState: (state: any) => void }>(null!);
const useContext = () => React.useContext(Context);
const Provider = Context.Provider;

export { useContext, Provider };
