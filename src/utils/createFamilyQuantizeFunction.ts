import { FamilyTypeOption, FSAToFamily, NumericalFamilyKey } from "@types";
import * as d3 from "d3";
export const createQuantizeFunction = (
  data: FSAToFamily,
  familyKey: FamilyTypeOption,
  numericalKey: NumericalFamilyKey
) => {
  const numerical = Object.values(data)
    .map((curr) => curr[familyKey][numericalKey])
    .filter(Boolean);
  const quantizedData = d3
    .scaleQuantize()
    .domain(d3.extent(numerical) as [number, number])
    .range(d3.schemeOranges[9] as any);

  return quantizedData;
};
