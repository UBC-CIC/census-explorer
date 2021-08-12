import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useFamilyData from "@hooks/family/useFamilyData";
import useCurrentScale from "@hooks/quantized/useCurrentScale";
import useQuantizedIncomeData from "@hooks/quantized/useQuantizedIncomeData";
import { FSAType, SelectedDataOption } from "@types";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";

const useSelectedColor = (FSA: FSAType) => {
  const [_, selectedType] = useSelectedData();
  const quantizedFamilyData = useCurrentScale();
  const familyData = useFamilyData();
  const { data: quantizedIncomeData } = useQuantizedIncomeData();
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
        (quantizedFamilyData(
          familyData[FSA]![selectedFamilyType]![selectedNumericalType]
        ) as string) || "#c4c4c4"
      );
  }
};

export default useSelectedColor;
