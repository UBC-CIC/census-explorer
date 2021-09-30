import useCensusData from "@hooks/census/useCensusData";
import useFamilyData from "@hooks/family/useFamilyData";
import useIncomeData from "@hooks/income/useIncomeData";
import {
  FSAToCensus,
  FSAToFamily,
  FSAToIncome,
  SelectedCategoryOption,
} from "@types";
import useSelectedCategory from "./useSelectedCategory";

const useSelectedData = (): FSAToCensus | FSAToIncome | FSAToFamily => {
  const category = useSelectedCategory();
  const familyData = useFamilyData();
  const censusData = useCensusData();
  const incomeData = useIncomeData();

  switch (category) {
    case SelectedCategoryOption.CENSUS:
      return censusData as FSAToCensus;
    case SelectedCategoryOption.INCOME:
      return incomeData as FSAToIncome;
    case SelectedCategoryOption.FAMILY:
    default:
      return familyData as FSAToFamily;
  }
};

export default useSelectedData;
