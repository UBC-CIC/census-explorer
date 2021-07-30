import CensusDataContext from "@context/census/CensusDataProvider";
import { useContext } from "react";

const useCensusDataLoading = () => {
  const context = useContext(CensusDataContext);
  if (!context)
    throw new Error(
      "useCensusDataLoading must be called inside a CensusDataProvider"
    );
  return context.loading;
};

export default useCensusDataLoading;
