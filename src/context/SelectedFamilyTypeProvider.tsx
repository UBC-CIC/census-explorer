import { FamilyTypeOption, NumericalFamilyKey } from "@types";
import React, { ReactNode, useState } from "react";

type DataContextType = {
  selectedFamilyType: FamilyTypeOption;
  setSelectedFamilyType: React.Dispatch<React.SetStateAction<FamilyTypeOption>>;
  selectedNumericalType: NumericalFamilyKey;
  setSelectedNumericalType: React.Dispatch<
    React.SetStateAction<NumericalFamilyKey>
  >;
};

const SelectedFamilyTypeContext = React.createContext({} as DataContextType);

export const SelectedFamilyTypeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selectedFamilyType, setSelectedFamilyType] =
    useState<FamilyTypeOption>(FamilyTypeOption.COUPLE_WITH_CHILDREN);
  const [selectedNumericalType, setSelectedNumericalType] =
    useState<NumericalFamilyKey>(NumericalFamilyKey.TotDons);
  return (
    <SelectedFamilyTypeContext.Provider
      value={{
        selectedFamilyType,
        setSelectedFamilyType,
        selectedNumericalType,
        setSelectedNumericalType,
      }}
    >
      {children}
    </SelectedFamilyTypeContext.Provider>
  );
};

export default SelectedFamilyTypeContext;
