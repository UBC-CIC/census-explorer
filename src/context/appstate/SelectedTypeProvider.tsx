import { ReactNode } from "react";
import { SelectedFamilyTypeProvider } from "./SelectedFamilyTypeProvider";
import { SelectedIncomeTypeProvider } from "./SelectedIncomeTypeProvider";

const SelectedTypeProvider = ({ children }: { children: ReactNode }) => (
  <SelectedIncomeTypeProvider>
    <SelectedFamilyTypeProvider>{children}</SelectedFamilyTypeProvider>
  </SelectedIncomeTypeProvider>
);

export default SelectedTypeProvider;
