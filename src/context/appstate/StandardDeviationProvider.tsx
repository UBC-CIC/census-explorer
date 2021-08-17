import React, { ReactNode, useState } from "react";

type StandardDeviationContextType = {
  deviations: number;
  setDeviations: React.Dispatch<React.SetStateAction<number>>;
};

const StandardDeviationContext = React.createContext(
  {} as StandardDeviationContextType
);

export const StandardDeviationProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [deviations, setDeviations] = useState(1);

  return (
    <StandardDeviationContext.Provider value={{ deviations, setDeviations }}>
      {children}
    </StandardDeviationContext.Provider>
  );
};

export default StandardDeviationContext;
