import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useFamilyData from "@hooks/family/useFamilyData";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
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
  const loading = useScaleLoading();

  if (loading) return [];

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

const useScaleLoading = () => {
  const [, selectedType] = useSelectedData();
  const familyLoading = useFamilyDataLoading();
  const incomeLoading = useIncomeDataLoading();
  const censusLoading = useCensusDataLoading();
  if (selectedType === SelectedDataOption.FAMILY && familyLoading) return true;
  if (selectedType === SelectedDataOption.INCOME && incomeLoading) return true;
  if (selectedType === SelectedDataOption.CENSUS && censusLoading) return true;
};
export { useScaleLoading };
export default useSelectedScale;
