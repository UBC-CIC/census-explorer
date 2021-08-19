import HoveredContext from "@context/appstate/HoveredProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";
import useSelectedType from "./useSelectedType";

const useHoveredData = () => {
  const { hovered } = useContext(HoveredContext);
  const data = useSelectedData();
  const selectedType = useSelectedType();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);

  if (!hovered) return { data: null, hoevered: undefined };
  return {
    data: (data as any)[hovered][selectedType][selectedNumericalType] as number,
    fsa: hovered,
  };
};

export default useHoveredData;
