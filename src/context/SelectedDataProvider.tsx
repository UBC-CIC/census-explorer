import { SelectedDataOption } from "@types";
import React, { ReactNode, useEffect, useState } from "react";

type SelectedDataContextType = {
  selected: SelectedDataOption;
  setSelected: React.Dispatch<React.SetStateAction<SelectedDataOption>>;
};

const SelectedDataContext = React.createContext({} as SelectedDataContextType);

export const SelectedDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selected, setSelected] = useState(SelectedDataOption.FAMILY);

  return (
    <SelectedDataContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedDataContext.Provider>
  );
};

export default SelectedDataContext;
