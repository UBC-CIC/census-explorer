import HoveredContext from "@context/appstate/HoveredProvider";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useProvinceData from "@hooks/province/useProvinceData";
import { useTheme } from "@material-ui/core";
import { FSAType, TopoJSONNames } from "@types";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import { GeoJSON } from "react-leaflet";
import FSA from "./FSA";

type GeoJSONLayerProps = {
  provinceName: TopoJSONNames;
};

const GeoJSONLayer = ({ provinceName }: GeoJSONLayerProps) => {
  const selected = useSelectedProvinces();
  const features = useProvinceData(provinceName);
  return (
    <>
      {features &&
        selected[provinceName] &&
        features.map((feature: any) => <FSA feature={feature} />)}
    </>
  );
};

export default GeoJSONLayer;
