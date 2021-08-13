import { CensusTypeOption } from "@types";
import React, { ReactNode, useState } from "react";

type DataContextType = {
  selectedCensusType: CensusTypeOption;
  setselectedCensusType: React.Dispatch<React.SetStateAction<CensusTypeOption>>;
};

const SelectedCensusTypeContext = React.createContext({} as DataContextType);

export const SelectedCensusTypeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selectedCensusType, setselectedCensusType] =
    useState<CensusTypeOption>(CensusTypeOption.TODO);
  return (
    <SelectedCensusTypeContext.Provider
      value={{
        selectedCensusType,
        setselectedCensusType,
      }}
    >
      {children}
    </SelectedCensusTypeContext.Provider>
  );
};

export default SelectedCensusTypeContext;
