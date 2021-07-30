import ProvinceDataContext from "@context/ProvinceDataProvider";
import { ProvinceOption } from "@context/SelectedProvincesContext";
import { useContext } from "react";

const useOutlineData = (provinceName?: keyof ProvinceOption) => {
  const context = useContext(ProvinceDataContext);
  if (!context)
    throw new Error(
      "useProvinceData must be called inside a DataContextProvider"
    );
  if (provinceName) return context.outlines[provinceName];
  return context.outlines;
};

export default useOutlineData;
