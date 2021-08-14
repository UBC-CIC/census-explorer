import MapFSA from "@components/MapFSA";
import useProvinceData from "@hooks/province/useProvinceData";
import { FSAFeatureType, PathFunctionType, TopoJSONNames } from "@types";
import projection from "@utils/projection";
import { ExtendedFeature } from "d3";
import { memo } from "react";
import { SVGOverlay, useMap } from "react-leaflet";

type GeoJSONLayerProps = {
  provinceName: TopoJSONNames;
};

const GeoJSONLayer = memo(({ provinceName }: GeoJSONLayerProps) => {
  const map = useMap();
  const bounds = map.getBounds();
  const features = useProvinceData(provinceName);
  let featuresAndPath = features.map((feature: ExtendedFeature) => [
    feature,
    projection(feature),
  ]) as [FSAFeatureType, PathFunctionType][];

  return (
    <>
      <SVGOverlay bounds={bounds}>
        <svg>
          {featuresAndPath.map(([feature, item], index) => (
            <MapFSA key={index} feature={feature} path={item()} />
          ))}
        </svg>
      </SVGOverlay>
    </>
  );
});

export default GeoJSONLayer;
