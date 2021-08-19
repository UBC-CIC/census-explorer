import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useCurrentColorScale from "@hooks/quantized/useCurrentColorScale";
import { FSAType } from "@types";
import isFSAToCensus from "@utils/isFSAToCensus";
import { useContext } from "react";
import useSelectedCategory from "./useSelectedCategory";
import useSelectedData from "./useSelectedData";
import useSelectedType from "./useSelectedType";

const INVALID_COLOR = "#A9A9A9";

const useSelectedColor = (FSA: FSAType | undefined) => {
  const colorScale = useCurrentColorScale();
  const data = useSelectedData();
  const type = useSelectedType();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  if (FSA === undefined) return INVALID_COLOR;
  if (isFSAToCensus(data)) return INVALID_COLOR;
  else
    return (
      (colorScale(data[FSA]![type]![selectedNumericalType]) as string) ||
      INVALID_COLOR
    );
};

export default useSelectedColor;
