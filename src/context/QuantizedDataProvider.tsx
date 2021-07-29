import useSelectedData from "@hooks/useSelectedData";
import { FamilyDataEntry, FSA, SelectedDataOption } from "@types";
import React, { ReactNode, useEffect, useState } from "react";
import * as d3 from "d3";
import useFamilyDataLoading from "@hooks/useFamilyDataLoading";

type QuantizedDataContextType = {
  data: any;
};

const QuantizedDataContext = React.createContext(
  {} as QuantizedDataContextType
);

export type FSADataColorMap = {
  [key in FSA]?: string;
};

export const QuantizedDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const loading = useFamilyDataLoading();
  const data = useSelectedData();
  console.log(data);
  if (loading) return <>{children}</>;

  const currKey: keyof FamilyDataEntry = "NumDons";
  const values = Object.values(data);
  const numerical = Object.values(data)
    .map((curr) => curr[currKey])
    .filter(Boolean);

  const quantizedData = d3
    .scaleQuantize()
    .domain(d3.extent(numerical) as [number, number])
    .range([
      // "#f7fcf0",
      // "#e0f3db",
      // "#ccebc5",
      // "#a8ddb5",
      // "#7bccc4",
      // "#4eb3d3",
      // "#2b8cbe",
      // "#0868ac",
      // "#005120",
      ...d3.schemeOranges[9],
    ] as any);

  console.log(quantizedData.domain());

  const averageDonRate = d3.mean(values.map((curr) => curr.DonRate));
  console.log({ averageDonRate });

  const retData: FSADataColorMap = {};

  Object.values(data).forEach(
    (curr) => (retData[curr.FSA] = quantizedData(curr[currKey]) as any)
  );

  return (
    <QuantizedDataContext.Provider value={{ data: retData }}>
      {children}
    </QuantizedDataContext.Provider>
  );
};

export default QuantizedDataContext;
