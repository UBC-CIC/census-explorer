import { FamilyDataEntry, FSA } from "@types";
import React, { ReactNode, useEffect, useState } from "react";

type FamilyDataCollection = {
  [fsa in FSA]?: FamilyDataEntry;
};
type DataContextType = {
  loading: boolean;
  data: FamilyDataCollection;
};

const FamilyDataContext = React.createContext({} as DataContextType);

// TODO cache fetched files in browser / service worker
const fetchFSAData = async () => {
  const res = await fetch("/api/family-data");
  const data = await res.json();
  console.log({ data });

  return data;
};

export const FamilyDataProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [data, setData] = useState({
    loading: true,
  } as DataContextType);

  useEffect(() => {
    if (data.loading)
      fetchFSAData().then((data) => {
        setData({ data, loading: false });
      });
  }, []);

  return (
    <FamilyDataContext.Provider value={{ ...data }}>
      {children}
    </FamilyDataContext.Provider>
  );
};

export default FamilyDataContext;
