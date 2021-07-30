import MapFSA from "@components/MapFSA";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useProvinceData from "@hooks/province/useProvinceData";
import { FSAFeatureType, PathFunctionType, TopoJSONNames } from "@types";
import projection from "@utils/projection";
import { ExtendedFeature } from "d3";
import { memo } from "react";

type InnerProvincePathProps = {
  provinceName: TopoJSONNames;
};

const InnerProvincePath = memo(({ provinceName }: InnerProvincePathProps) => {
  const features = useProvinceData(provinceName);

  let featuresAndPath = features.map((feature: ExtendedFeature) => [
    feature,
    projection(feature),
  ]) as [FSAFeatureType, PathFunctionType][];

  return (
    <>
      {featuresAndPath.map(([feature, item], index) => (
        <MapFSA key={index} feature={feature} path={item} />
      ))}
    </>
  );
});

type ProvincePathProps = {
  provinceName: TopoJSONNames;
};

const ProvincePath = ({ provinceName }: ProvincePathProps) => {
  const provinces = useSelectedProvinces();

  return (
    <g style={{ visibility: provinces[provinceName] ? "visible" : "hidden" }}>
      <InnerProvincePath provinceName={provinceName} />
    </g>
  );
};

export default ProvincePath;
