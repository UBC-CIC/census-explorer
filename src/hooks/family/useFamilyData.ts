import FamilyDataContext from "@context/FamilyDataProvider";
import { useContext } from "react";

const useFamilyData = () => {
  const context = useContext(FamilyDataContext);
  if (!context)
    throw new Error("useFamilyData must be called inside a FamilyDataProvider");
  return context.data;
};

export default useFamilyData;
