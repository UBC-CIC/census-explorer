import SelectedCategoryContext from "@context/appstate/SelectedCategoryProvider";
import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import { SelectedCategoryOption } from "@types";
import { useContext } from "react";
import CensusDataContext from "@context/census/CensusDataProvider";

const useSelectedType = () => {
  const { selectedFamilyType } = useContext(SelectedFamilyTypeContext);
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);
  const { selectedCID } = useContext(CensusDataContext);
  const { selected } = useContext(SelectedCategoryContext);
  switch (selected) {
    case SelectedCategoryOption.INCOME:
      return selectedIncomeType;
    case SelectedCategoryOption.CENSUS:
      return selectedCID;
    case SelectedCategoryOption.FAMILY:
    default:
      return selectedFamilyType;
  }
};

export default useSelectedType;
