import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { useState } from "react";
import { PathFunctionType, Properties } from "types";
import { randomColor } from "./DataMap";

type MapFSAProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: PathFunctionType;
};

const MapFSA = ({ path, feature }: MapFSAProps) => {
  const [active, setActive] = useState(false);
  const selectedColor = randomColor();
  const fsaPath = path();
  return (
    <path
      key={fsaPath}
      d={fsaPath || ""}
      style={{
        stroke: "#000",
        strokeWidth: 0.01,
        fill: active ? "black" : selectedColor,
      }}
      onClickCapture={() => console.log(feature.properties.CFSAUID)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    />
  );
};

export default MapFSA;
