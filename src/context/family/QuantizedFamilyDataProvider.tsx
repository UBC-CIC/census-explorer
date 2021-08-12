import useFamilyData from "@hooks/family/useFamilyData";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import {
  FamilyTypeOption,
  FSAToFamilyEntry,
  FSAType,
  NumericalDonationKey,
} from "@types";
import { createFamilyQuantizeFunction } from "@utils/createQuantizeFunctions";
import React, { ReactNode } from "react";

type QuantizedDataContextType = {
  data: FamilyTypeToFSAColorMap;
  scales: QuantizeFunctions;
};

const QuantizedDataFamilyContext = React.createContext(
  {} as QuantizedDataContextType
);

export type FamilyTypeToFSAColorMap = {
  [fsa in FSAType]?: {
    [famType in FamilyTypeOption]?: {
      [numType in NumericalDonationKey]?: string;
    };
  };
};

export type FSADataColorMap = {
  [key in FSAType]?: string;
};

type QuantizeFunctions = {
  [famType in FamilyTypeOption]?: {
    [numType in NumericalDonationKey]?: d3.ScaleQuantize<number, string>;
  };
};

export const QuantizedFamilyDataProvider = (props: {
  children?: ReactNode;
}) => {
  const { children } = props;
  const loading = useFamilyDataLoading();
  const data = useFamilyData();
  if (loading) return <>{children}</>;
  console.time("FAMQ");

  const quantizeFunctions: QuantizeFunctions = {
    [FamilyTypeOption.COUPLE_WITHOUT_CHILDREN]: {},
    [FamilyTypeOption.COUPLE_WITH_CHILDREN]: {},
    [FamilyTypeOption.LONE_PARENT_FAMILIES]: {},
    [FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES]: {},
  };

  for (const famType of Object.values(FamilyTypeOption)) {
    quantizeFunctions[famType] = {};
    for (const numType of Object.values(NumericalDonationKey)) {
      quantizeFunctions[famType]![numType] = createFamilyQuantizeFunction(
        data,
        famType,
        numType
      );
    }
  }
  console.log(quantizeFunctions);

  const retData: FamilyTypeToFSAColorMap = {};

  for (const entry of Object.entries(data)) {
    const [typedKey, value] = entry as [FSAType, FSAToFamilyEntry];
    retData[typedKey] = {
      [FamilyTypeOption.COUPLE_WITHOUT_CHILDREN]: {},
      [FamilyTypeOption.COUPLE_WITH_CHILDREN]: {},
      [FamilyTypeOption.LONE_PARENT_FAMILIES]: {},
      [FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES]: {},
    };
    for (const famType of Object.values(FamilyTypeOption)) {
      for (const numType of Object.values(NumericalDonationKey)) {
        retData![typedKey]![famType]![numType] = quantizeFunctions![famType]![
          numType
        ]!(value[famType][numType]) as unknown as string;
      }
    }
  }
  console.timeEnd("FAMQ");

  console.log(retData);

  return (
    <QuantizedDataFamilyContext.Provider
      value={{ data: retData, scales: quantizeFunctions }}
    >
      {children}
    </QuantizedDataFamilyContext.Provider>
  );
};

export default QuantizedDataFamilyContext;
