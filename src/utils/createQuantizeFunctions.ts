import {
  FamilyTypeOption,
  FSAToFamily,
  FSAToIncome,
  IncomeTypeOption,
  NumericalDonationKey,
} from "@types";
import * as d3 from "d3";
export const createFamilyQuantizeFunction = (
  data: FSAToFamily,
  familyKey: FamilyTypeOption,
  numericalKey: NumericalDonationKey
) => {
  const numerical = Object.values(data)
    .map((curr) => curr[familyKey][numericalKey])
    .filter(Boolean);
  const quantizedData = d3
    .scaleQuantize()
    .domain(d3.extent(numerical as any) as unknown as [number, number])
    .range(d3.schemeOranges[9] as any);

  return quantizedData;
};
export const createIncomeQuantizeFunction = (
  data: FSAToIncome,
  incomeKey: IncomeTypeOption,
  numericalKey: NumericalDonationKey
) => {
  const numerical = Object.values(data)
    .map((curr) => curr[incomeKey][numericalKey])
    .filter(Boolean);
  const quantizedData = d3
    .scaleQuantize()
    .domain(d3.extent(numerical as any) as unknown as [number, number])
    .range(d3.schemeOranges[9] as any);

  return quantizedData;
};
