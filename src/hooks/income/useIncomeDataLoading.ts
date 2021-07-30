import IncomeDataContext from "@context/income/IncomeDataProvider";
import { useContext } from "react";

const useIncomeDataLoading = () => {
  const context = useContext(IncomeDataContext);
  if (!context)
    throw new Error(
      "useIncomeDataLoading must be called inside a IncomeDataProvider"
    );
  return context.loading;
};

export default useIncomeDataLoading;
