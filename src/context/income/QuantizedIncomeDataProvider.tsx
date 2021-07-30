import useIncomeData from "@hooks/income/useIncomeData";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
import {
  FSAToIncomeEntry,
  FSAType,
  IncomeTypeOption,
  NumericalDonationKey,
} from "@types";
import { createIncomeQuantizeFunction } from "@utils/createQuantizeFunctions";
import React, { ReactNode } from "react";

type QuantizedDataContextType = {
  data: IncomeTypeToFSAColorMap;
};

const QuantizedDataIncomeContext = React.createContext(
  {} as QuantizedDataContextType
);

export type IncomeTypeToFSAColorMap = {
  [fsa in FSAType]?: {
    [incomeGroup in IncomeTypeOption]?: {
      [numType in NumericalDonationKey]?: string;
    };
  };
};

export type FSADataColorMap = {
  [key in FSAType]?: string;
};

type QuantizeFunctions = {
  [famType in IncomeTypeOption]?: {
    [numType in NumericalDonationKey]?: (value: any) => any;
  };
};

export const QuantizedIncomeDataProvider = (props: {
  children?: ReactNode;
}) => {
  const { children } = props;
  const loading = useIncomeDataLoading();
  const data = useIncomeData();
  if (loading) return <>{children}</>;

  const quantizeFunctions: QuantizeFunctions = {
    [IncomeTypeOption.l20K]: {},
    [IncomeTypeOption.l40K]: {},
    [IncomeTypeOption.l60K]: {},
    [IncomeTypeOption.l80K]: {},
    [IncomeTypeOption.l100K]: {},
    [IncomeTypeOption.l150K]: {},
    [IncomeTypeOption.l200K]: {},
    [IncomeTypeOption.l250K]: {},
    [IncomeTypeOption.ge250K]: {},
  };

  for (const incomeType of Object.values(IncomeTypeOption)) {
    quantizeFunctions[incomeType] = {};
    for (const numType of Object.values(NumericalDonationKey)) {
      quantizeFunctions[incomeType]![numType] = createIncomeQuantizeFunction(
        data,
        incomeType,
        numType
      );
    }
  }

  const retData: IncomeTypeToFSAColorMap = {};

  for (const entry of Object.entries(data)) {
    const [typedKey, value] = entry as [FSAType, FSAToIncomeEntry];
    retData[typedKey] = {
      [IncomeTypeOption.l20K]: {},
      [IncomeTypeOption.l40K]: {},
      [IncomeTypeOption.l60K]: {},
      [IncomeTypeOption.l80K]: {},
      [IncomeTypeOption.l100K]: {},
      [IncomeTypeOption.l150K]: {},
      [IncomeTypeOption.l200K]: {},
      [IncomeTypeOption.l250K]: {},
      [IncomeTypeOption.ge250K]: {},
    };
    for (const incomeType of Object.values(IncomeTypeOption)) {
      for (const numType of Object.values(NumericalDonationKey)) {
        retData![typedKey]![incomeType]![numType] = quantizeFunctions![
          incomeType
        ]![numType]!(value[incomeType][numType]);
      }
    }
  }

  return (
    <QuantizedDataIncomeContext.Provider value={{ data: retData }}>
      {children}
    </QuantizedDataIncomeContext.Provider>
  );
};

export default QuantizedDataIncomeContext;
