import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { PathFunctionType, Properties } from "types";

type MinimapProvinceProps = {
  feature: ExtendedFeature<GeoGeometryObjects | null, Properties>;
  path: PathFunctionType;
};

const MinimapProvince = ({ path, feature }: MinimapProvinceProps) => {
  const fsaPath = path();
  const style = {
    stroke: "#000",
    strokeWidth: 1,
    fill: "#8e918f",
  };
  return (
    <path
      key={fsaPath}
      d={fsaPath || ""}
      style={style}
      onClickCapture={() => console.log(feature.properties.CFSAUID)}
    />
  );
};

export default MinimapProvince;
