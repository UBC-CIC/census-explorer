import { canadaTopo } from "@data";
import * as d3 from "d3";
import { ExtendedFeature, ExtendedFeatureCollection } from "d3";
import * as topojson from "topojson-client";
import {
  ReactSVGPanZoom,
  UncontrolledReactSVGPanZoom,
} from "react-svg-pan-zoom";
import { useRef } from "react";

type DataMapProps = {};
const canadaProjection = (width: number, height: number) =>
  d3
    .geoAzimuthalEqualArea()
    .rotate([100, -45])
    .center([5, 20])
    .scale(width / 1.24)
    .translate([width / 2, height / 2.35]);

const DataMap = (props: DataMapProps) => {
  const Viewer = useRef<ReactSVGPanZoom>(null);
  const canadaData = canadaTopo.objects["canada"];
  const features = (
    topojson.feature(canadaTopo, canadaData) as ExtendedFeatureCollection
  ).features;
  console.log(features);

  const path = (feature: ExtendedFeature) => {
    const projection = canadaProjection(1000, 500);
    return () => d3.geoPath(projection)(feature);
  };

  let m2 = features.map((feature: ExtendedFeature) => path(feature));
  console.log(m2);

  const subutniStyle = {
    fill: "#FFCCBC",
    stroke: "#FF5722",
    strokeWidth: 0.01,
  };

  return (
    <div>
      <UncontrolledReactSVGPanZoom
        ref={Viewer}
        width={500}
        height={500}
        onZoom={(e) => console.log("zoom")}
        onPan={(e) => console.log("pan")}
        onClick={(event) =>
          console.log("click", event.x, event.y, event.originalEvent)
        }
      >
        <svg>
          {m2.map((item) => (
            <path d={item() || ""} style={subutniStyle} />
          ))}
        </svg>
      </UncontrolledReactSVGPanZoom>
    </div>
  );
};

export default DataMap;
