import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { useState } from "react";
import { PathFunctionType, Properties } from "types";

type MinimapProvinceProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: string | null;
  strokeWidth?: number;
  fill?: string;
  hoveredFill?: string;
};

const MinimapProvince = ({
  path,
  feature,
  strokeWidth = 1,
  fill = "#8e918f",
  hoveredFill = "#f0f0f0",
}: MinimapProvinceProps) => {
  const fsaPath = path;
  const [hovered, setHovered] = useState(false);
  const style = {
    stroke: "#000",
    strokeWidth,
    fill: hovered ? hoveredFill : fill,
  };
  return (
    <path
      key={fsaPath}
      d={fsaPath || ""}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClickCapture={() => console.log(feature.properties.CFSAUID)}
    />
  );
};

export default MinimapProvince;
