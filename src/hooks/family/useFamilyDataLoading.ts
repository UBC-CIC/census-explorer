import FamilyDataContext from "@context/family/FamilyDataProvider";
import { useContext } from "react";

const useFamilyDataLoading = () => {
  const context = useContext(FamilyDataContext);
  if (!context)
    throw new Error(
      "useFamilyDataLoading must be called inside a FamilyDataProvider"
    );
  return context.loading;
};

export default useFamilyDataLoading;
