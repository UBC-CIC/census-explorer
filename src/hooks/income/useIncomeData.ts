import IncomeDataContext from "@context/income/IncomeDataProvider";
import { useContext } from "react";

const useIncomeData = () => {
  const context = useContext(IncomeDataContext);
  if (!context)
    throw new Error("useIncomeData must be called inside a IncomeDataProvider");
  return context.data;
};

export default useIncomeData;
