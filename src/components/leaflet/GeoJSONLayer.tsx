import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import HoveredBoundsContext from "@context/appstate/HoveredBoundsProvider";
import HoveredContext from "@context/appstate/HoveredProvider";
import IsolatedFSAContext from "@context/appstate/IsolatedFSAProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useBoundsSet from "@hooks/appstate/useBoundsSet";
import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useSelectedType from "@hooks/appstate/useSelectedType";
import useProvinceData from "@hooks/province/useProvinceData";
import { FSAType, TopoJSONNames } from "@types";
import React, { memo, useContext } from "react";
import { useMap } from "react-leaflet";
import { CustomMap } from "./AreaSelect";
import FSA from "./FSA";

type GeoJSONLayerProps = {
  provinceName: TopoJSONNames;
};

const GeoJSONLayer = ({ provinceName }: GeoJSONLayerProps) => {
  const selected = useSelectedProvinces();
  const { selection, setSelection } = useContext(FSASelectionContext);
  const { isolated } = useContext(IsolatedFSAContext);
  const { setHovered } = useContext(HoveredContext);
  const boundsSet = useBoundsSet(provinceName);
  const features = useProvinceData(provinceName);
  return (
    <>
      {features &&
        selected[provinceName] &&
        features.map((feature: any) => {
          const fsa = feature.properties.CFSAUID;
          if (isolated.size && !isolated.has(fsa)) {
            return null;
          }

          return (
            <FSA
              inBounds={boundsSet.has(fsa)}
              selected={selection.has(fsa)}
              toggleSelected={setSelection}
              setHovered={setHovered}
              feature={feature}
            />
          );
        })}
    </>
  );
};

// Memoized so that we don't have to re-render the map when the selection / hover state changes
/** @see https://reactjs.org/docs/react-api.html#reactmemo*/
export default memo(GeoJSONLayer);
