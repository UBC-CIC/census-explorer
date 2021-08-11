import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { useState } from "react";
import { Properties } from "types";

type SelectorProvinceProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: string | null;
  strokeWidth?: number;
  fill?: string;
  hoveredFill?: string;
  onClick?: () => void;
};

const SelectorProvince = ({
  path,
  feature,
  strokeWidth = 1,
  fill = "#8e918f",
  hoveredFill = "#AD2723",
  onClick = () => ({}),
}: SelectorProvinceProps) => {
  const fsaPath = path;
  const [hovered, setHovered] = useState(false);
  const style = {
    stroke: "#000",
    strokeWidth,
    fill: hovered ? hoveredFill : fill,
    cursor: "pointer",
  };
  return (
    <path
      key={fsaPath}
      d={fsaPath || ""}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClickCapture={() => onClick()}
    />
  );
};

export default SelectorProvince;
