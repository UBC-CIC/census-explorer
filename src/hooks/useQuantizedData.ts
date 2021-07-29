import { useContext } from "react";
import QuantizedDataContext from "@context/QuantizedDataProvider";
const useQuantizedData = () => {
  const context = useContext(QuantizedDataContext);
  if (!context)
    throw new Error(
      "useQuantizedData must be called inside a QuantizedDataProvider"
    );
  return context.data;
};

export default useQuantizedData;
