import useFamilyData from "@hooks/family/useFamilyData";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import {
  FamilyTypeOption,
  FSAToFamilyEntry,
  FSAType,
  NumericalFamilyKey,
} from "@types";
import { createQuantizeFunction } from "@utils/createFamilyQuantizeFunction";
import React, { ReactNode } from "react";

type QuantizedDataContextType = {
  data: FamilyTypeToFSAColorMap;
};

const QuantizedDataFamilyContext = React.createContext(
  {} as QuantizedDataContextType
);

export type FamilyTypeToFSAColorMap = {
  [fsa in FSAType]?: {
    [famType in FamilyTypeOption]?: {
      [numType in NumericalFamilyKey]?: string;
    };
  };
};

export type FSADataColorMap = {
  [key in FSAType]?: string;
};

type QuantizeFunctions = {
  [famType in FamilyTypeOption]?: {
    [numType in NumericalFamilyKey]?: (value: any) => any;
  };
};

export const QuantizedFamilyDataProvider = (props: {
  children?: ReactNode;
}) => {
  const { children } = props;
  const loading = useFamilyDataLoading();
  const data = useFamilyData();
  if (loading) return <>{children}</>;

  const quantizeFunctions: QuantizeFunctions = {
    [FamilyTypeOption.COUPLE_WITHOUT_CHILDREN]: {},
    [FamilyTypeOption.COUPLE_WITH_CHILDREN]: {},
    [FamilyTypeOption.LONE_PARENT_FAMILIES]: {},
    [FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES]: {},
  };

  for (const famType of Object.values(FamilyTypeOption)) {
    quantizeFunctions[famType] = {};
    for (const numType of Object.values(NumericalFamilyKey)) {
      quantizeFunctions[famType]![numType] = createQuantizeFunction(
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
      for (const numType of Object.values(NumericalFamilyKey)) {
        retData![typedKey]![famType]![numType] = quantizeFunctions![famType]![
          numType
        ]!(value[famType][numType]);
      }
    }
  }

  console.log(retData);

  return (
    <QuantizedDataFamilyContext.Provider value={{ data: retData }}>
      {children}
    </QuantizedDataFamilyContext.Provider>
  );
};

export default QuantizedDataFamilyContext;
