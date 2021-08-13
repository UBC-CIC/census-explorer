import { NumericalDonationKey } from "@types";
import React, { ReactNode, useState } from "react";

type SelectedNumericalContextType = {
  selectedNumericalType: NumericalDonationKey;
  setSelectedNumericalType: React.Dispatch<
    React.SetStateAction<NumericalDonationKey>
  >;
};

const SelectedNumericalContext = React.createContext(
  {} as SelectedNumericalContextType
);

export const SelectedNumericalProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selectedNumericalType, setSelectedNumericalType] =
    useState<NumericalDonationKey>(NumericalDonationKey.TotDons);
  return (
    <SelectedNumericalContext.Provider
      value={{
        selectedNumericalType,
        setSelectedNumericalType,
      }}
    >
      {children}
    </SelectedNumericalContext.Provider>
  );
};

export default SelectedNumericalContext;
