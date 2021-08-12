import { FSAToFamilyEntry, SelectedDataOption } from "@types";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import * as d3 from "d3";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useFamilyData from "@hooks/family/useFamilyData";
import useFSASets from "@hooks/province/useFSASets";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import SelectedFamilyTypeContext from "./SelectedFamilyTypeProvider";
import useSelectedData from "@hooks/appstate/useSelectedData";

type CurrentScaleContextType = {
  scale: d3.ScaleQuantize<number, string> | d3.ScaleQuantile<number, string>;
};

const emptyScale = d3.scaleQuantize<number, string>();

const CurrentScaleContext = React.createContext({} as CurrentScaleContextType);

export const CurrentScaleProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const family = useFamilyData();
  const selectedData = useSelectedData();
  const fsaSets = useFSASets();
  const provinces = useSelectedProvinces();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );

  // Returns an empty scale if data is not available
  if (!family || !fsaSets || !provinces || !selectedData) {
    return (
      <CurrentScaleContext.Provider value={{ scale: emptyScale }}>
        {children}
      </CurrentScaleContext.Provider>
    );
  }

  // Filter out the non-selected provinces
  const filtered = Object.entries(family)
    .map(([key, value]: [any, any]) => {
      const province = getProvinceFromFSA(key, fsaSets);
      if (!province) return null;
      if (!provinces[province]) return null;
      return value[selectedFamilyType][selectedNumericalType];
    })
    // remove nulls
    .filter(Boolean);

  const scale = d3
    .scaleQuantile()
    .domain(filtered as any)
    .range(d3.schemeOranges[9] as any);

  return (
    <CurrentScaleContext.Provider value={{ scale }}>
      {children}
    </CurrentScaleContext.Provider>
  );
};

export default CurrentScaleContext;
