import SelectedFamilyTypeContext from "@context/SelectedFamilyTypeProvider";
import { FamilyTypeOption, FSAType, NumericalFamilyKey } from "@types";
import { useContext } from "react";
import useQuantizedFamilyData from "../quantized/useQuantizedFamilyData";
import useSelectedData from "./useSelectedData";

const useSelectedColor = (FSA: FSAType) => {
  const [_, selectedType] = useSelectedData();
  const quantize = useQuantizedFamilyData();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );
  return (
    quantize[FSA]![selectedFamilyType]![selectedNumericalType] || "#c4c4c4"
  );
};

export default useSelectedColor;
