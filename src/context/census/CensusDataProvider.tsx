import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import { CacheInput, CIDandCategory, FSAToCensus, FSAType } from "@types";
import { CensusProvinceOption } from "API";
import React, { ReactNode, useEffect, useState } from "react";
import getCensusData from "./queries/censusDataByProvinceCID";
import getHeadersAndCategories from "./queries/getAllHeadersAndCategories";

type CachedCIDsSet = Set<number>;

type CensusDataContextType = {
  handleChangeSubcategory: (selection: number) => void;
  FSAToCensusData: FSAToCensus;
  loading: boolean;
  headers: Map<string, CIDandCategory[]>;
  selectedCID: number;
};

const CensusDataContext = React.createContext({} as CensusDataContextType);

// Gets the headers to list for the Census Data Selector
const fetchCensusHeaders = async () => {
  let headers = await getHeadersAndCategories();
  return headers;
};

export const CensusDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState<Map<string, CIDandCategory[]>>(
    new Map()
  );
  const provinces = useSelectedProvinces();
  const [FSAToCensusData, setFSAToCensusData] = useState({} as FSAToCensus);
  const [cachedCIDS, setCachedCIDS] = useState<CachedCIDsSet>(new Set());
  const [selectedCID, setSelectedCID] = useState(0);

  // Runs on change of subcategory, gets the data for the selected subcategory, caches it.
  const handleChangeSubcategory = async (selection: number) => {
    if (!cachedCIDS.has(selection)) {
      setLoading(() => true);
      await cacheCensusData(selection);
      setLoading(() => false);
    }
    setSelectedCID(selection);
    console.log("cache", FSAToCensusData);
  };

  const cacheCensusData = async (selection: number) => {
    const dataToCache = FSAToCensusData;
    const newCachedCIDS = new Set(cachedCIDS);
    const selectedProvinces = Object.entries(provinces)
      .filter(([key, value]) => value)
      .map(([key]) => key.toUpperCase() as CensusProvinceOption);

    let provincesWithData = (await Promise.all(
      selectedProvinces.map(async (province) => {
        return { [province]: await getCensusData(province, selection) };
      })
    )) as CacheInput;

    // O(13*2n) = O(n)
    provincesWithData.forEach((province) => {
      const provinceName = Object.keys(province)[0];
      const fsasForGivenProvince = province[provinceName];
      if (!fsasForGivenProvince) return;
      const builtFromProvince: FSAToCensus = {};
      fsasForGivenProvince.filter(Boolean).forEach((datum) => {
        if (!datum?.CID || !datum.FSA) return;
        newCachedCIDS.add(datum.CID);
        builtFromProvince[datum.FSA as FSAType] = { [datum.CID]: datum };
      });
      Object.entries(builtFromProvince).forEach(([FSA, data]) => {
        const typedFSA = FSA as FSAType;
        dataToCache[typedFSA] = { ...dataToCache[typedFSA], ...data };
      });
    });
    setFSAToCensusData(() => dataToCache);
    setCachedCIDS(() => newCachedCIDS);
  };

  useEffect(() => {
    // if (loading)
    fetchCensusHeaders().then((headers) => {
      setHeaders(() => headers);
      setLoading(() => false);
    });
  }, []);

  return (
    <CensusDataContext.Provider
      value={{
        loading,
        headers,
        handleChangeSubcategory,
        FSAToCensusData,
        selectedCID,
      }}
    >
      {children}
    </CensusDataContext.Provider>
  );
};

export default CensusDataContext;
