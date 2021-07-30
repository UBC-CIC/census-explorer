import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useQuantizedIncomeData from "@hooks/quantized/useQuantizedIncomeData";
import {
  FamilyTypeOption,
  FSAType,
  IncomeTypeOption,
  NumericalDonationKey,
  SelectedDataOption,
} from "@types";
import { useContext } from "react";
import useQuantizedFamilyData from "../quantized/useQuantizedFamilyData";
import useSelectedData from "./useSelectedData";

const useSelectedColor = (FSA: FSAType) => {
  const [_, selectedType] = useSelectedData();
  const quantizedFamilyData = useQuantizedFamilyData();
  const quantizedIncomeData = useQuantizedIncomeData();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);
  switch (selectedType) {
    case SelectedDataOption.INCOME:
      return (
        quantizedIncomeData[FSA]![selectedIncomeType]![selectedNumericalType] ||
        "#c4c4c4"
      );
    case SelectedDataOption.FAMILY:
    default:
      return (
        quantizedFamilyData[FSA]![selectedFamilyType]![selectedNumericalType] ||
        "#c4c4c4"
      );
  }
};

export default useSelectedColor;
