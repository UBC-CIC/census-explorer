import ProvinceDataContext from "@context/ProvinceDataProvider";
import { useContext } from "react";

const useProvincesLoading = () => {
  const context = useContext(ProvinceDataContext);
  if (!context)
    throw new Error(
      "useProvinceData must be called inside a DataContextProvider"
    );
  return context.loading;
};

export default useProvincesLoading;
