import {
  CacheInput,
  CIDandCategory,
  FSAToCensus,
  FSAToFamily,
  FSAType,
} from "@types";
import { CensusProvinceOption } from "API";
import React, { ReactNode, useEffect, useState } from "react";
import getHeadersAndCategories from "./queries/getAllHeadersAndCategories";

type DataContextType = {
  loading: boolean;
  cachedCensusData: FSAToCensus;
  headers: Map<string, CIDandCategory[]>;
};

type CensusDataContextType = {
  data: DataContextType;
  cacheCensusData: (data: CacheInput) => void;
};

const CensusDataContext = React.createContext({} as CensusDataContextType);

const fetchCensusHeaders = async () => {
  console.log("Fetching Census Header");
  let headers = await getHeadersAndCategories();

  return headers;
};

export const CensusDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [data, setData] = useState({
    loading: true,
  } as DataContextType);
  const [FSAToCensusData, setFSAToCensusData] = useState({} as FSAToCensus);

  // O(n^3)
  const cacheCensusData = (provincesWithData: CacheInput) => {
    provincesWithData.forEach((province) => {
      const provinceName = Object.keys(province)[0];
      Object.values(province).forEach((censusData) => {
        censusData?.forEach((census) => {
          console.log(censusData);
          const keyedByFSA = {
            [census!.FSA]: census,
          };
          console.log(keyedByFSA);
        });
      });
    });
  };

  useEffect(() => {
    if (data.loading)
      fetchCensusHeaders().then((headers) => {
        setData((old) => ({ ...old, headers, loading: false }));
      });
  }, []);

  return (
    <CensusDataContext.Provider value={{ data, cacheCensusData }}>
      {children}
    </CensusDataContext.Provider>
  );
};

export default CensusDataContext;
