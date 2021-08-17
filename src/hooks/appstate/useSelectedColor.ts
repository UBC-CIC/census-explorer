import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useFamilyData from "@hooks/family/useFamilyData";
import useCurrentColorScale from "@hooks/quantized/useCurrentColorScale";
import useCurrentScale from "@hooks/quantized/useCurrentScale";
import useQuantizedIncomeData from "@hooks/quantized/useQuantizedIncomeData";
import { FSAType, SelectedCategoryOption } from "@types";
import isFSAToCensus from "@utils/isFSAToCensus";
import { useContext } from "react";
import useSelectedCategory from "./useSelectedCategory";
import useSelectedData from "./useSelectedData";
import useSelectedType from "./useSelectedType";

const INVALID_COLOR = "#A9A9A9";

const useSelectedColor = (FSA: FSAType) => {
  const selectedCategory = useSelectedCategory();
  const colorScale = useCurrentColorScale();
  const data = useSelectedData();
  const type = useSelectedType();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);

  if (isFSAToCensus(data)) return INVALID_COLOR;
  else
    return (
      (colorScale(data[FSA]![type]![selectedNumericalType]) as string) ||
      INVALID_COLOR
    );
};

export default useSelectedColor;
