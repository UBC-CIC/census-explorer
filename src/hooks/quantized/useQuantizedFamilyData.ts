import { useContext } from "react";
import QuantizedDataFamilyContext from "@context/QuantizedFamilyDataProvider";
const useQuantizedFamilyData = () => {
  const family = useContext(QuantizedDataFamilyContext);
  if (!family)
    throw new Error(
      "useQuantizedData must be called inside a QuantizedDataProvider"
    );
  return family.data;
};

export default useQuantizedFamilyData;
