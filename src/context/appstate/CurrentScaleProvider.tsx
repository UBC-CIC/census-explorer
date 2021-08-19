/** This component passes the d3 scale and the filtered numerical data to its
 * children.
 */

import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useSelectedType from "@hooks/appstate/useSelectedType";
import useFamilyData from "@hooks/family/useFamilyData";
import useFSASets from "@hooks/province/useFSASets";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import * as d3 from "d3";
import React, { ReactNode, useContext } from "react";
import SelectedFamilyTypeContext from "./SelectedFamilyTypeProvider";
import SelectedNumericalContext from "./SelectedNumericalProvider";
import StandardDeviationContext from "./StandardDeviationProvider";

type CurrentScaleContextType = {
  scale: d3.ScaleQuantize<number, string> | d3.ScaleQuantile<number, string>;
  data: number[];
  colorScale: d3.ScaleLinear<number, number, string>;
};

const emptyScale = d3.scaleQuantize<number, string>();
const emptyColorScale = d3.scaleLinear<number, number, string>();

const CurrentScaleContext = React.createContext({} as CurrentScaleContextType);

export const CurrentScaleProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const selectedData = useSelectedData();
  const fsaSets = useFSASets();
  const provinces = useSelectedProvinces();
  const selectedType = useSelectedType();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const { deviations } = useContext(StandardDeviationContext);

  // Returns an empty scale if data is not available
  if (!fsaSets || !provinces || !selectedData) {
    return (
      <CurrentScaleContext.Provider
        value={{ colorScale: emptyColorScale, scale: emptyScale, data: [] }}
      >
        {children}
      </CurrentScaleContext.Provider>
    );
  }

  // Filter out the non-selected provinces
  const filtered = Object.entries(selectedData)
    .map(([key, value]: [any, any]) => {
      const province = getProvinceFromFSA(key, fsaSets);
      if (!province) return null;
      if (!provinces[province]) return null;
      return value[selectedType][selectedNumericalType];
    })
    // remove nulls
    .filter(Boolean);

  const min = d3.min(filtered);
  const dev = d3.deviation(filtered) as number;
  const scale = d3
    .scaleQuantize()
    .domain([min, dev * deviations] as any)
    .range(d3.schemeOranges[9] as any);

  const colorScale = d3
    .scaleLinear()
    .domain([min, dev * deviations])
    .range([0, 1] as any)
    .interpolate(() => d3.interpolateOranges as any);

  return (
    <CurrentScaleContext.Provider value={{ colorScale, scale, data: filtered }}>
      {children}
    </CurrentScaleContext.Provider>
  );
};

export default CurrentScaleContext;
