import QuantizedDataIncomeContext from "@context/income/QuantizedIncomeDataProvider";
import { useContext } from "react";
const useQuantizedIncomeData = () => {
  const income = useContext(QuantizedDataIncomeContext);
  if (!income)
    throw new Error(
      "useQuantizedData must be called inside a QuantizedDataProvider"
    );
  return income.data;
};

export default useQuantizedIncomeData;
