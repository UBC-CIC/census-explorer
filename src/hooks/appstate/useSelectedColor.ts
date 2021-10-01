import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import CensusDataContext from "@context/census/CensusDataProvider";
import useCurrentColorScale from "@hooks/quantized/useCurrentColorScale";
import {
  FamilyTypeOption,
  FSAToCensus,
  FSAToFamily,
  FSAToIncome,
  FSAType,
  IncomeTypeOption,
  NumericalDonationKey,
  SelectedCategoryOption,
} from "@types";
import isFSAToCensus from "@utils/isFSAToCensus";
import { ScaleLinear } from "d3";
import { useContext } from "react";
import useSelectedCategory from "./useSelectedCategory";
import useSelectedData from "./useSelectedData";
import useSelectedType from "./useSelectedType";

const INVALID_COLOR = "#A9A9A9";

const handleCategoryIsFamily = (
  selectedNumericalType: NumericalDonationKey,
  data: FSAToFamily,
  type: FamilyTypeOption,
  FSA: FSAType,
  colorScale: ScaleLinear<number, number, string>
) => {
  if (!data[FSA]) return INVALID_COLOR;
  if (!data[FSA]![type]) return INVALID_COLOR;
  if (!data[FSA]![type][selectedNumericalType]) return INVALID_COLOR;
  return colorScale(data[FSA]![type][selectedNumericalType]) as string;
};

const handleCategoryIsIncome = (
  selectedNumericalType: NumericalDonationKey,
  data: FSAToIncome,
  type: IncomeTypeOption,
  FSA: FSAType,
  colorScale: ScaleLinear<number, number, string>
) => {
  if (!data[FSA]) return INVALID_COLOR;
  if (!data[FSA]![type]) return INVALID_COLOR;
  if (!data[FSA]![type][selectedNumericalType]) return INVALID_COLOR;
  return colorScale(data[FSA]![type][selectedNumericalType]) as string;
};

const handleCategoryIsCensus = (
  CID: number,
  data: FSAToCensus,
  FSA: FSAType,
  colorScale: ScaleLinear<number, number, string>
) => {
  if (!data[FSA]) return INVALID_COLOR;
  if (!data[FSA]![CID]) return INVALID_COLOR;
  if (!data[FSA]![CID]["TOTAL_COUNT"]) return INVALID_COLOR;
  return colorScale(data![FSA]![CID]!["TOTAL_COUNT"]!) as string;
};

const useSelectedColor = (FSA: FSAType | undefined) => {
  const colorScale = useCurrentColorScale();
  const data = useSelectedData();
  const type = useSelectedType();
  const category = useSelectedCategory();
  const { selectedCID } = useContext(CensusDataContext);
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  if (!FSA || !data) return INVALID_COLOR;
  switch (category) {
    case SelectedCategoryOption.CENSUS:
      return handleCategoryIsCensus(selectedCID, data, FSA, colorScale);
    case SelectedCategoryOption.FAMILY:
      return handleCategoryIsFamily(
        selectedNumericalType,
        data as FSAToFamily,
        type as FamilyTypeOption,
        FSA,
        colorScale
      );
    case SelectedCategoryOption.INCOME:
      return handleCategoryIsIncome(
        selectedNumericalType,
        data as FSAToIncome,
        type as IncomeTypeOption,
        FSA,
        colorScale
      );
    default:
      return INVALID_COLOR;
  }
};

export default useSelectedColor;
