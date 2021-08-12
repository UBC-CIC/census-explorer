import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useFSASets from "@hooks/province/useFSASets";
import useCurrentScale from "@hooks/quantized/useCurrentScale";
import { SelectedDataOption } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";
import useSelectedProvinces from "./useSelectedProvinces";
import { useScaleLoading } from "./useSelectedScale";

const useHistogramData = () => {
  useCurrentScale();
  const [selected, selectedType] = useSelectedData();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );
  const loading = useScaleLoading();
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);
  const provinces = useSelectedProvinces();
  const fsaSets = useFSASets();

  if (loading || !fsaSets) return [];
  const formattedForHistogram = Object.entries(selected)
    .map(([key, value]: any, index) => {
      const province = getProvinceFromFSA(key, fsaSets);
      if (!province) return null;
      if (!provinces[province]) return null;

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
