import SelectedDataContext from "@context/appstate/SelectedDataProvider";
import useCensusData from "@hooks/census/useCensusData";
import useFamilyData from "@hooks/family/useFamilyData";
import useIncomeData from "@hooks/income/useIncomeData";
import {
  FSAToCensus,
  FSAToFamily,
  FSAToIncome,
  SelectedDataOption,
} from "@types";
import { useContext } from "react";

type SelectedDataType = [
  FSAToFamily | FSAToCensus | FSAToIncome,
  SelectedDataOption
];
const useSelectedData = () => {
  const context = useContext(SelectedDataContext);
  const familyData = useFamilyData();
  const censusData = useCensusData();
  const incomeData = useIncomeData();

  if (!context)
    throw new Error(
      "useSelectedData must be called inside a SelectedDataProvider"
    );

  switch (context.selected) {
    case SelectedDataOption.FAMILY:
      return [familyData, context.selected] as SelectedDataType;
    case SelectedDataOption.CENSUS:
      return [censusData, context.selected] as SelectedDataType;
    case SelectedDataOption.INCOME:
      return [incomeData, context.selected] as SelectedDataType;
    default:
      return [{}, context.selected] as SelectedDataType;
  }
};

export default useSelectedData;
