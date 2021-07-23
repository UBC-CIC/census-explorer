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
import MinimapProvince from "./MinimapProvince";

type InnerProvincePathProps = {
  provinceName: TopoJSONNames;
};

const InnerMinimapProvincePath = memo(
  ({ provinceName }: InnerProvincePathProps) => {
    const [features, setFeatures] = useState([] as ExtendedFeature[]);
    const nameWithOutline = `${provinceName}-outline`;
    useEffect(() => {
      const fetchTopoData = async () => {
        const res = await fetch(`/api/${nameWithOutline}`);
        const provinceTopo =
          (await res.json()) as unknown as CanadaTopologyType;

        const properties = provinceTopo.objects[nameWithOutline];
        const features = (
          topojson.feature(
            provinceTopo,
            properties
          ) as ExtendedFeatureCollection
        ).features;
        setFeatures(features);
      };
      if (!features.length) fetchTopoData();
    }, [nameWithOutline]);

    let featuresAndPath = features.map((feature: ExtendedFeature) => [
      feature,
      projection(feature),
    ]) as [FSAFeatureType, PathFunctionType][];

    return (
      <>
        {featuresAndPath.map(([feature, item]) => (
          <MinimapProvince feature={feature} path={item} />
        ))}
      </>
    );
  }
);

type ProvincePathProps = {
  provinceName: TopoJSONNames;
};

const MinimapProvincePath = ({ provinceName }: ProvincePathProps) => {
  const provinces = useSelectedProvinces();

  return (
    <g style={{ visibility: provinces[provinceName] ? "visible" : "hidden" }}>
      <InnerMinimapProvincePath provinceName={provinceName} />
    </g>
  );
};

export default MinimapProvincePath;
