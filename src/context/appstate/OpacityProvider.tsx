import React, { ReactNode, useState } from "react";

type OpacityContextType = {
  opacity: number;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
};

const OpacityContext = React.createContext({} as OpacityContextType);

export const OpacityProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [opacity, setOpacity] = useState(0.5);

  return (
    <OpacityContext.Provider value={{ opacity, setOpacity }}>
      {children}
    </OpacityContext.Provider>
  );
};

export default OpacityContext;
