import SelectedCensusTypeContext from "@context/appstate/SelectedCensusTypeProvider";
import SelectedCategoryContext from "@context/appstate/SelectedDataProvider";
import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import { SelectedCategoryOption } from "@types";
import { useContext } from "react";

const useSelectedType = () => {
  const { selectedFamilyType } = useContext(SelectedFamilyTypeContext);
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);
  const { selectedCensusType } = useContext(SelectedCensusTypeContext);
  const { selected } = useContext(SelectedCategoryContext);
  switch (selected) {
    case SelectedCategoryOption.INCOME:
      return selectedIncomeType;
    case SelectedCategoryOption.CENSUS:
      return selectedCensusType;
    case SelectedCategoryOption.FAMILY:
    default:
      return selectedFamilyType;
  }
};

export default useSelectedType;
