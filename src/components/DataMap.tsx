// import { canadaTopo } from "@data";
import * as d3 from "d3";
import { ExtendedFeature, ExtendedFeatureCollection } from "d3";
import * as topojson from "topojson-client";
import {
  ReactSVGPanZoom,
  UncontrolledReactSVGPanZoom,
} from "react-svg-pan-zoom";
import { useEffect, useRef, useState } from "react";
import MapFSA from "./MapFSA";
import useWindowDimensions from "@hooks/useWindowDimensions";
import { CanadaTopologyType, FSAFeatureType, PathFunctionType } from "types";

export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
type DataMapProps = {};
const canadaProjection = (width: number, height: number) =>
  d3
    .geoAzimuthalEqualArea()
    .rotate([100, -45])
    .center([5, 20])
    .scale(width / 1.24)
    .translate([width / 2, height / 2.35]);

const DataMap = (props: DataMapProps) => {
  const { width, height } = useWindowDimensions();
  const Viewer = useRef<ReactSVGPanZoom>(null);
  const [canadaData, setCanadaData] = useState({} as any);
  const [features, setFeatures] = useState([] as ExtendedFeature[]);
  // const features = (
  //   topojson.feature(canadaTopo, canadaData) as ExtendedFeatureCollection
  // ).features;
  useEffect(() => {
    const fetchCanadaData = async () => {
      const res = await fetch("/api/canada");
      const canadaTopo = (await res.json()) as unknown as CanadaTopologyType;
      setCanadaData(canadaTopo.objects["canada"]);
      const features = (
        topojson.feature(
          canadaTopo,
          canadaTopo.objects["canada"]
        ) as ExtendedFeatureCollection
      ).features;
      setFeatures(features);
    };

    fetchCanadaData();
  }, []);

  const path = (feature: ExtendedFeature) => {
    const projection = canadaProjection(width, height);
    return () => d3.geoPath(projection)(feature);
  };

  let m2 = features.map((feature: ExtendedFeature) => [
    feature,
    path(feature),
  ]) as [FSAFeatureType, PathFunctionType][];

  return (
    <div>
      <UncontrolledReactSVGPanZoom ref={Viewer} width={width} height={height}>
        <svg
          onLoad={() => console.log("loaded")}
          width={width}
          height={height}
          style={{ backgroundColor: "#0000" }}
        >
          {m2.map(([feature, item]) => (
            <MapFSA feature={feature} path={item} />
          ))}
        </svg>
      </UncontrolledReactSVGPanZoom>
    </div>
  );
};

export default DataMap;
