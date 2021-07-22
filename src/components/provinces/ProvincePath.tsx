import MapFSA from "@components/MapFSA";
import useSelectedProvinces from "@hooks/useSelectedProvinces";
import {
  CanadaTopologyType,
  FSAFeatureType,
  PathFunctionType,
  TopoJSONNames,
} from "@types";
import projection from "@utils/projection";
import { ExtendedFeature, ExtendedFeatureCollection } from "d3";
import { memo, useEffect, useState } from "react";
import * as topojson from "topojson-client";

type InnerProvincePathProps = {
  provinceName: TopoJSONNames;
};

const InnerProvincePath = memo(({ provinceName }: InnerProvincePathProps) => {
  const [features, setFeatures] = useState([] as ExtendedFeature[]);

  useEffect(() => {
    const fetchTopoData = async () => {
      const res = await fetch(`/api/${provinceName}`);
      const provinceTopo = (await res.json()) as unknown as CanadaTopologyType;

      const properties = provinceTopo.objects[provinceName];
      const features = (
        topojson.feature(provinceTopo, properties) as ExtendedFeatureCollection
      ).features;
      setFeatures(features);
    };
    fetchTopoData();
  }, [provinceName]);

  console.log(provinceName, "rerendered");

  let featuresAndPath = features.map((feature: ExtendedFeature) => [
    feature,
    projection(feature),
  ]) as [FSAFeatureType, PathFunctionType][];

  return (
    <>
      {featuresAndPath.map(([feature, item]) => (
        <MapFSA feature={feature} path={item} />
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
