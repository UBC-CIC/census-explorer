import HoveredContext from "@context/appstate/HoveredProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import CensusDataContext from "@context/census/CensusDataProvider";
import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import { FSAToCensus, SelectedCategoryOption } from "@types";
import { useContext } from "react";
import useSelectedCategory from "./useSelectedCategory";
import useSelectedData from "./useSelectedData";
import useSelectedType from "./useSelectedType";

const useHoveredData = () => {
  const { hovered } = useContext(HoveredContext);
  const data = useSelectedData();
  const { selectedCID } = useContext(CensusDataContext);
  const selectedType = useSelectedType();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const category = useSelectedCategory();
  const loading = useCensusDataLoading();
  if (!hovered) return { data: null, fsa: undefined };
  if (category === SelectedCategoryOption.CENSUS) {
    if (loading || !data[hovered]) return { data: null, fsa: undefined };
    return {
      data: (data as FSAToCensus)[hovered]![selectedCID][
        "TOTAL_COUNT"
      ] as number,
      fsa: hovered,
    };
  }
  return {
    data: (data as any)[hovered][selectedType][selectedNumericalType] as number,
    fsa: hovered,
  };
};

export default useHoveredData;
