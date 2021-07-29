import useSelectedColor from "@hooks/useSelectedColor";
import { randomColor } from "@utils/randomColor";
import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { useState } from "react";
import { FSA, PathFunctionType, Properties } from "types";

type MapFSAProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: PathFunctionType;
};

function LightenDarkenColor(col: any, amt: any) {
  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;
  var b = ((num >> 8) & 0x00ff) + amt;
  var g = (num & 0x0000ff) + amt;
  var newColor = g | (b << 8) | (r << 16);
  return newColor.toString(16);
}

const MapFSA = ({ path, feature }: MapFSAProps) => {
  const fsa = feature.properties.CFSAUID as FSA;
  const [active, setActive] = useState(false);
  const selectedColor = useSelectedColor(fsa);
  const fsaPath = path();
  if (fsa === "V7N") console.log(selectedColor);

  const style = {
    stroke: "#000",
    strokeWidth: 0.01,
    fill: active ? "red" : selectedColor,
  };

  return (
    <path
      key={`${fsaPath}`}
      d={fsaPath || ""}
      style={style}
      onClickCapture={() => console.log(fsa)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    />
  );
};

export default MapFSA;
