import SelectedDataContext from "@context/SelectedDataProvider";
import { SelectedDataOption } from "@types";
import { useContext } from "react";
import useFamilyData from "./useFamilyData";
import useFamilyDataLoading from "./useFamilyDataLoading";

const useSelectedData = () => {
  const context = useContext(SelectedDataContext);
  const familyData = useFamilyData();

  if (!context)
    throw new Error(
      "useSelectedData must be called inside a SelectedDataProvider"
    );

  switch (context.selected) {
    case SelectedDataOption.FAMILY:
      return familyData;
    default:
      return {};
  }
};

export default useSelectedData;
