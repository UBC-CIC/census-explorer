import React, { ReactNode, useState } from "react";

type HoveredBoundsContextType = {
  bounds: [number, number] | undefined;
  setBounds: React.Dispatch<React.SetStateAction<[number, number] | undefined>>;
};

const HoveredBoundsContext = React.createContext(
  {} as HoveredBoundsContextType
);

export const HoveredBoundsProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [bounds, setBounds] = useState<[number, number] | undefined>();

  return (
    <HoveredBoundsContext.Provider value={{ bounds, setBounds }}>
      {children}
    </HoveredBoundsContext.Provider>
  );
};

export default HoveredBoundsContext;
