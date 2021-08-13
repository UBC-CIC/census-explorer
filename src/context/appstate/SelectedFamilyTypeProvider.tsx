import { FamilyTypeOption, NumericalDonationKey } from "@types";
import React, { ReactNode, useState } from "react";

type DataContextType = {
  selectedFamilyType: FamilyTypeOption;
  setSelectedFamilyType: React.Dispatch<React.SetStateAction<FamilyTypeOption>>;
};

const SelectedFamilyTypeContext = React.createContext({} as DataContextType);

export const SelectedFamilyTypeProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selectedFamilyType, setSelectedFamilyType] =
    useState<FamilyTypeOption>(FamilyTypeOption.COUPLE_WITH_CHILDREN);
  return (
    <SelectedFamilyTypeContext.Provider
      value={{
        selectedFamilyType,
        setSelectedFamilyType,
      }}
    >
      {children}
    </SelectedFamilyTypeContext.Provider>
  );
};

export default SelectedFamilyTypeContext;
