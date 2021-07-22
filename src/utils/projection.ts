import * as d3 from "d3";
import { ExtendedFeature } from "d3";

const canadaProjection = (width: number, height: number) =>
  d3
    .geoAzimuthalEqualArea()
    .rotate([100, -45])
    .center([5, 20])
    .scale(width / 1.24)
    .translate([width / 2, height / 2.35]);

const projection = (feature: ExtendedFeature, width = 1000, height = 1000) => {
  const projection = canadaProjection(width, height);
  return () => d3.geoPath(projection)(feature);
};

export default projection;
