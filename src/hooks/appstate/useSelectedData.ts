import SelectedDataContext from "@context/SelectedDataProvider";
import useCensusData from "@hooks/census/useCensusData";
import useFamilyData from "@hooks/family/useFamilyData";
import { SelectedDataOption } from "@types";
import { useContext } from "react";

const useSelectedData = () => {
  const context = useContext(SelectedDataContext);
  const familyData = useFamilyData();
  const censusData = useCensusData();

  if (!context)
    throw new Error(
      "useSelectedData must be called inside a SelectedDataProvider"
    );

  switch (context.selected) {
    case SelectedDataOption.FAMILY:
      return [familyData, context.selected];
    case SelectedDataOption.CENSUS:
      return [censusData, context.selected];
    default:
      return [{}, context.selected];
  }
};

export default useSelectedData;
