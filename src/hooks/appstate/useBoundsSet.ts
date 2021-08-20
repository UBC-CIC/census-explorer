import HoveredBoundsContext from "@context/appstate/HoveredBoundsProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useFSASets from "@hooks/province/useFSASets";
import { FSAType, ProvinceOption, TopoJSONNames } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import { useContext } from "react";
import useSelectedData from "./useSelectedData";
import useSelectedProvinces from "./useSelectedProvinces";
import useSelectedType from "./useSelectedType";

const useBoundsSet = (province?: TopoJSONNames) => {
  const boundsSet = new Set<FSAType>();
  const fsaSets = useFSASets();
  const selectedProvinces = useSelectedProvinces();
  const data = useSelectedData();
  const { bounds } = useContext(HoveredBoundsContext);
  const selectedType = useSelectedType();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  if (!bounds) return boundsSet;
  if (province) {
    let fsas = fsaSets[province];
    Array.from(fsas).forEach((fsa) => {
      let value = (data as any)[fsa][selectedType][
        selectedNumericalType
      ] as number;
      if (!bounds) return;
      else if (bounds[0] <= value && bounds[1] > value)
        boundsSet.add(fsa as FSAType);
    });
    return boundsSet;
  } else {
    Object.keys(data).forEach((fsa) => {
      let province = getProvinceFromFSA(
        fsa as FSAType,
        fsaSets
      ) as TopoJSONNames;
      if (!province) return;
      if (!selectedProvinces[province]) {
        return;
      }
      let value = (data as any)[fsa][selectedType][
        selectedNumericalType
      ] as number;

      if (bounds[0] <= value && bounds[1] >= value) {
        boundsSet.add(fsa as FSAType);
      }
    });
    return boundsSet;
  }
};

export default useBoundsSet;
