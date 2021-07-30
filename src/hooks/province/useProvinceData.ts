import ProvinceDataContext from "@context/ProvinceDataProvider";
import { ProvinceOption } from "@context/SelectedProvincesContext";
import { useContext } from "react";

const useProvinceData = (provinceName: keyof ProvinceOption) => {
  const context = useContext(ProvinceDataContext);
  if (!context)
    throw new Error(
      "useProvinceData must be called inside a DataContextProvider"
    );
  return context.provinces[provinceName];
};

export default useProvinceData;
