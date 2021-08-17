import { FSAType } from "@types";
import React, { ReactNode, useState } from "react";

type HoveredContextType = {
  hovered: FSAType | undefined;
  setHovered: React.Dispatch<React.SetStateAction<FSAType | undefined>>;
};

const HoveredContext = React.createContext({} as HoveredContextType);

export const HoveredProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [hovered, setHovered] = useState<FSAType | undefined>();

  return (
    <HoveredContext.Provider value={{ hovered, setHovered }}>
      {children}
    </HoveredContext.Provider>
  );
};

export default HoveredContext;
