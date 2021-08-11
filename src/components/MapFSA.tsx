import useSelectedColor from "@hooks/appstate/useSelectedColor";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { useMemo, useState } from "react";
import { FSAType, PathFunctionType, Properties } from "types";

type MapFSAProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: string | null;
};

const MapFSA = ({ path, feature }: MapFSAProps) => {
  const fsa = feature.properties.CFSAUID as FSAType;
  const [active, setActive] = useState(false);
  const selectedColor = useSelectedColor(fsa);
  // const fsaPath = useMemo(path, [path]);

  const style: CSSProperties = {
    stroke: "#000",
    strokeWidth: 0.01,
    fill: selectedColor,
    filter: active ? "brightness(88%)" : "",
  };

  return (
    <path
      key={`${path}`}
      d={path || ""}
      style={style}
      onClickCapture={() => console.log(fsa)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    />
  );
};

export default MapFSA;
