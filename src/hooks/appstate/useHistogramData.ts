import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useQuantizedFamilyData from "@hooks/quantized/useQuantizedFamilyData";
import useQuantizedIncomeData from "@hooks/quantized/useQuantizedIncomeData";
import { FSAType, ProfileIDToCensus, SelectedDataOption } from "@types";
import { format } from "d3";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";
import { useScaleLoading } from "./useSelectedScale";

const useHistogramData = () => {
  const [selected, selectedType] = useSelectedData();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );
  const loading = useScaleLoading();

  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);

  if (loading) return [];
  const formattedForHistogram = Object.values(selected)
    .map((value: any, index) => {
      switch (selectedType) {
        case SelectedDataOption.INCOME:
          return value[selectedIncomeType][selectedNumericalType];
        case SelectedDataOption.FAMILY:
        default:
          return value[selectedFamilyType][selectedNumericalType];
      }
    })
    .filter(Boolean);
  return formattedForHistogram;
};

export default useHistogramData;
