import SelectedProvincesContext from "@context/appstate/SelectedProvincesContext";
import { TopoJSONNames } from "@types";
import { useContext } from "react";

const useSelectedProvinces = (name?: TopoJSONNames) => {
  const context = useContext(SelectedProvincesContext);
  if (!context)
    throw new Error(
      "useSelectedProvinces must be used within a SelectedProvincesProvider"
    );
  return context.provinces;
};

export default useSelectedProvinces;
