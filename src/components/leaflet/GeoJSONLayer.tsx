import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useProvinceData from "@hooks/province/useProvinceData";
import { FSAType, TopoJSONNames } from "@types";
import React, { memo } from "react";
import FSA from "./FSA";

type GeoJSONLayerProps = {
  provinceName: TopoJSONNames;
  setHovered: React.Dispatch<React.SetStateAction<FSAType | undefined>>;
  toggleSelected: React.Dispatch<React.SetStateAction<Set<FSAType>>>;
};

const GeoJSONLayer = ({
  provinceName,
  setHovered,
  toggleSelected,
}: GeoJSONLayerProps) => {
  const selected = useSelectedProvinces();
  const features = useProvinceData(provinceName);
  return (
    <>
      {features &&
        selected[provinceName] &&
        features.map((feature: any) => (
          <FSA
            toggleSelected={toggleSelected}
            setHovered={setHovered}
            feature={feature}
          />
        ))}
    </>
  );
};

// Memoized so that we don't have to re-render the map when the selection / hover state changes
/** @see https://reactjs.org/docs/react-api.html#reactmemo*/
export default memo(GeoJSONLayer);
