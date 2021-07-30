import { FSAToIncome } from "@types";
import React, { ReactNode, useEffect, useState } from "react";

type DataContextType = {
  loading: boolean;
  data: FSAToIncome;
};

const IncomeDataContext = React.createContext({} as DataContextType);

const fetchFSAData = async () => {
  const res = await fetch("/api/income-data");
  const data = await res.json();
  return data as FSAToIncome;
};

export const IncomeDataProvider = (props: { children?: ReactNode }) => {
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
    <IncomeDataContext.Provider value={{ ...data }}>
      {children}
    </IncomeDataContext.Provider>
  );
};

export default IncomeDataContext;
