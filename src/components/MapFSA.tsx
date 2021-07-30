import useSelectedColor from "@hooks/appstate/useSelectedColor";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { useState } from "react";
import { FSAType, PathFunctionType, Properties } from "types";

type MapFSAProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: PathFunctionType;
};

const MapFSA = ({ path, feature }: MapFSAProps) => {
  const fsa = feature.properties.CFSAUID as FSAType;
  const [active, setActive] = useState(false);
  const selectedColor = useSelectedColor(fsa);
  const fsaPath = path();

  const style: CSSProperties = {
    stroke: "#000",
    strokeWidth: 0.01,
    fill: active ? selectedColor : selectedColor,
    filter: active ? "brightness(88%)" : "",
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
