import { FSAToCensus, FSAToFamily, FSAType } from "@types";
import React, { ReactNode, useEffect, useState } from "react";

type DataContextType = {
  loading: boolean;
  data: FSAToCensus;
};

const CensusDataContext = React.createContext({} as DataContextType);

// TODO cache fetched files in browser / service worker
const fetchCensusData = async () => {
  console.log("Fetching Census Data");

  const res = await fetch("/api/census-data");
  const data = await res.json();

  console.log({ data });
  return data as FSAToCensus;
};

export const CensusDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [data, setData] = useState({
    loading: true,
  } as DataContextType);

  useEffect(() => {
    if (data.loading)
      fetchCensusData().then((data) => {
        setData(() => ({ data, loading: false }));
      });
  }, []);

  return (
    <CensusDataContext.Provider value={{ ...data }}>
      {children}
    </CensusDataContext.Provider>
  );
};

export default CensusDataContext;
