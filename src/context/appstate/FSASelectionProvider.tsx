import { FSAType } from "@types";
import React, { ReactNode, useState } from "react";

type FSASelectionContextType = {
  selection: Set<FSAType>;
  setSelection: React.Dispatch<React.SetStateAction<Set<FSAType>>>;
};

const FSASelectionContext = React.createContext({} as FSASelectionContextType);

export const FSASelectionProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selection, setSelection] = useState<Set<FSAType>>(new Set());
  return (
    <FSASelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </FSASelectionContext.Provider>
  );
};

export default FSASelectionContext;
