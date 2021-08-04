import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useQuantizedFamilyData from "@hooks/quantized/useQuantizedFamilyData";
import useQuantizedIncomeData from "@hooks/quantized/useQuantizedIncomeData";
import { NumericalDonationKey, SelectedDataOption } from "@types";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";

const useSelectedScale = () => {
  const [, selectedType] = useSelectedData();
  const { scales: familyScales } = useQuantizedFamilyData();
  const { scales: incomeScales } = useQuantizedIncomeData();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);

  switch (selectedType) {
    case SelectedDataOption.INCOME:
      return [
        incomeScales![selectedIncomeType]![selectedNumericalType],
        selectedIncomeType,
        selectedNumericalType,
      ] as [d3.ScaleQuantize<number, string>, string, NumericalDonationKey];
    case SelectedDataOption.FAMILY:
    default:
      return [
        familyScales[selectedFamilyType]![selectedNumericalType],
        selectedFamilyType,
        selectedNumericalType,
      ] as [d3.ScaleQuantize<number, string>, string, NumericalDonationKey];
  }
};

export default useSelectedScale;
