import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useFSASets from "@hooks/province/useFSASets";
import {
  FSAType,
  ProvinceOption,
  ProvinceOptions,
  SelectedDataOption,
  TopoJSONNames,
} from "@types";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";
import useSelectedProvinces from "./useSelectedProvinces";
import { useScaleLoading } from "./useSelectedScale";

const getProvinceFromFSA = (
  fsa: FSAType,
  fsaSets: { [province in TopoJSONNames]: Set<string> }
) => {
  let selectedEntry = Object.entries(fsaSets).find(([key, value]) =>
    value.has(fsa)
  );
  return selectedEntry ? (selectedEntry[0] as keyof ProvinceOptions) : "";
};
const useHistogramData = () => {
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
