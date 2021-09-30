import CensusDataContext from "@context/census/CensusDataProvider";
import { useContext } from "react";

const useCensusData = () => {
  const context = useContext(CensusDataContext);
  if (!context)
    throw new Error("useCensusData must be called inside a CensusDataProvider");
  return context.FSAToCensusData;
};

export default useCensusData;
