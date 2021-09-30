import { FSAToFamily } from "@types";
import React, { ReactNode, useEffect, useState } from "react";

type DataContextType = {
  loading: boolean;
  data: FSAToFamily;
};

const FamilyDataContext = React.createContext({} as DataContextType);

const fetchFSAData = async () => {
  const res = await fetch("/api/family-data");
  const data = await res.json();
  return data as FSAToFamily;
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
