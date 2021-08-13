import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useFSASets from "@hooks/province/useFSASets";
import { SelectedCategoryOption } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import { useContext, useState } from "react";
import useSelectedCategory from "./useSelectedCategory";
import useSelectedData from "./useSelectedData";
import useSelectedProvinces from "./useSelectedProvinces";

const useHistogramData = () => {
  const selectedCategory = useSelectedCategory();
  const selected = useSelectedData();
  const { selectedFamilyType } = useContext(SelectedFamilyTypeContext);
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const loading = false; // TODO
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);
  const provinces = useSelectedProvinces();
  const fsaSets = useFSASets();

  if (loading || !fsaSets) return [];

  // Get the data for the histogram, with unselected provinces removed
  const formattedForHistogram = Object.entries(selected)
    .map(([key, value]: any, index) => {
      const province = getProvinceFromFSA(key, fsaSets);
      if (!province) return null;
      if (!provinces[province]) return null;

      switch (selectedCategory) {
        case SelectedCategoryOption.INCOME:
          return value[selectedIncomeType][selectedNumericalType];
        case SelectedCategoryOption.FAMILY:
        default:
          return value[selectedFamilyType][selectedNumericalType];
      }
    })
    .filter(Boolean);
  return formattedForHistogram;
};

export default useHistogramData;
