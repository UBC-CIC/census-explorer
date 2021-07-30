import { IncomeTypeOption } from "@types";
import React, { ReactNode, useState } from "react";

type DataContextType = {
  selectedIncomeType: IncomeTypeOption;
  setSelectedIncomeType: React.Dispatch<React.SetStateAction<IncomeTypeOption>>;
};

const SelectedIncomeTypeContext = React.createContext({} as DataContextType);

export const SelectedIncomeTypeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selectedIncomeType, setSelectedIncomeType] =
    useState<IncomeTypeOption>(IncomeTypeOption.l20K);
  return (
    <SelectedIncomeTypeContext.Provider
      value={{
        selectedIncomeType,
        setSelectedIncomeType,
      }}
    >
      {children}
    </SelectedIncomeTypeContext.Provider>
  );
};

export default SelectedIncomeTypeContext;
