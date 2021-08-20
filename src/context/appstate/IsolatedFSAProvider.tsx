import { FSAType } from "@types";
import React, { ReactNode, useState } from "react";

type IsolatedContextType = {
  isolated: Set<FSAType>;
  setIsolated: React.Dispatch<React.SetStateAction<Set<FSAType>>>;
};

const IsolatedFSAContext = React.createContext({} as IsolatedContextType);

export const IsolatedFSAProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [isolated, setIsolated] = useState<Set<FSAType>>(new Set());

  return (
    <IsolatedFSAContext.Provider
      value={{ isolated: isolated, setIsolated: setIsolated }}
    >
      {children}
    </IsolatedFSAContext.Provider>
  );
};

export default IsolatedFSAContext;
