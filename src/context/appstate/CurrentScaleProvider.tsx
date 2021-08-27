/** This component passes the d3 scale and the filtered numerical data to its
 * children.
 */

import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useSelectedType from "@hooks/appstate/useSelectedType";
import useFSASets from "@hooks/province/useFSASets";
import { NumericalDonationKey } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import * as d3 from "d3";
import { dataJoin } from "d3fc";
import React, { ReactNode, useContext } from "react";
import IsolatedFSAContext from "./IsolatedFSAProvider";
import SelectedNumericalContext from "./SelectedNumericalProvider";
import StandardDeviationContext from "./StandardDeviationProvider";

type CurrentScaleContextType = {
  scale: d3.ScaleQuantize<number, string> | d3.ScaleQuantile<number, string>;
  data: number[];
  colorScale: d3.ScaleLinear<number, number, string>;
  min: number;
  max: number;
  domain: [number, number];
  dev: number;
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
  const { isolated } = useContext(IsolatedFSAContext);

  // Returns an empty scale if data is not available
  if (!fsaSets || !provinces || !selectedData) {
    return (
      <CurrentScaleContext.Provider
        value={{
          colorScale: emptyColorScale,
          scale: emptyScale,
          data: [],
          min: 0,
          max: 0,
          dev: 0,
          domain: [0, 0],
        }}
      >
        {children}
      </CurrentScaleContext.Provider>
    );
  }

  // Filter out the non-selected fsas
  const filtered = Object.entries(selectedData)
    .map(([key, value]: [any, any]) => {
      const province = getProvinceFromFSA(key, fsaSets);
      if (!province) return null;
      if (!provinces[province]) return null;
      if (isolated.size > 0 && !isolated.has(key)) return null;
      return value[selectedType][selectedNumericalType];
    })
    // remove nulls
    .filter(Boolean);

  let min = d3.min(filtered);
  let max = d3.max(filtered);
  let dev = d3.deviation(filtered) as number;

  if (filtered.length === 1) {
    min = 0;
    dev = 0;
  }

  let finalMax = max;

  if (dev) {
    finalMax = dev * deviations;
  }

  if (min > dev) {
    finalMax = max;
  }

  //Check for percentages
  if (selectedNumericalType === NumericalDonationKey.DonRate) {
    finalMax = max;
  }

  const domain = [min, finalMax] as [number, number];

  const scale = d3
    .scaleQuantize()
    .domain(domain as any)
    .range(d3.schemeOranges[9] as any);

  const colorScale = d3
    .scaleLinear()
    .domain([min, finalMax])
    .range(domain as any)
    .interpolate(() => d3.interpolateOranges as any);

  return (
    <CurrentScaleContext.Provider
      value={{
        colorScale,
        scale,
        data: filtered,
        min,
        max: finalMax,
        domain,
        dev,
      }}
    >
      {children}
    </CurrentScaleContext.Provider>
  );
};

export default CurrentScaleContext;