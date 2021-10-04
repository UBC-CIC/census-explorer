import { FSAToFamily } from "@types";
import React, { ReactNode, useEffect, useState } from "react";
import getAllFamilyData from "./queries/getAllFamilyData";

type DataContextType = {
  loading: boolean;
  data: FSAToFamily;
};

const FamilyDataContext = React.createContext({} as DataContextType);

const fetchFSAData = async () => {
  const data = await getAllFamilyData();
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
