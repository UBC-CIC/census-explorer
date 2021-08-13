import { ReactNode } from "react";
import { SelectedCensusTypeProvider } from "./SelectedCensusTypeProvider";
import { SelectedFamilyTypeProvider } from "./SelectedFamilyTypeProvider";
import { SelectedIncomeTypeProvider } from "./SelectedIncomeTypeProvider";

const SelectedTypeProvider = ({ children }: { children: ReactNode }) => (
  <SelectedCensusTypeProvider>
    <SelectedIncomeTypeProvider>
      <SelectedFamilyTypeProvider>{children}</SelectedFamilyTypeProvider>
    </SelectedIncomeTypeProvider>
  </SelectedCensusTypeProvider>
);

export default SelectedTypeProvider;
