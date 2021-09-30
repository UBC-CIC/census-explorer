import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { CensusTypeOption } from "@types";
import React, { ReactNode, useState } from "react";

type DataContextType = {
  selectedCensusType: CensusTypeOption;
  setSelectedCensusType: React.Dispatch<React.SetStateAction<CensusTypeOption>>;
};

const SelectedCensusTypeContext = React.createContext({} as DataContextType);

export const SelectedCensusTypeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const headers = useCensusHeaders();
  // console.log("headers");
  // console.log(headers);

  const [selectedCensusType, setSelectedCensusType] =
    useState<CensusTypeOption>(CensusTypeOption.TODO);
  return (
    <SelectedCensusTypeContext.Provider
      value={{
        selectedCensusType,
        setSelectedCensusType,
      }}
    >
      {children}
    </SelectedCensusTypeContext.Provider>
  );
};

export default SelectedCensusTypeContext;
