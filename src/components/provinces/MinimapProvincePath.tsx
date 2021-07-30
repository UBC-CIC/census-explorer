import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useOutlineData from "@hooks/province/useOutlineData";
import { FSAFeatureType, PathFunctionType, TopoJSONNames } from "@types";
import projection from "@utils/projection";
import { ExtendedFeature } from "d3";
import { memo } from "react";
import MinimapProvince from "./MinimapProvince";

type InnerProvincePathProps = {
  provinceName: TopoJSONNames;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
};

const InnerMinimapProvincePath = memo(
  ({
    provinceName,
    width,
    height,
    strokeWidth,
    fill,
  }: InnerProvincePathProps) => {
    const features = useOutlineData(provinceName);

    let featuresAndPath = features.map((feature: ExtendedFeature) => [
      feature,
      projection(feature, width, height),
    ]) as [FSAFeatureType, PathFunctionType][];

    return (
      <>
        {featuresAndPath.map(([feature, item], index) => (
          <MinimapProvince
            key={index}
            fill={fill}
            strokeWidth={strokeWidth}
            feature={feature}
            path={item}
          />
        ))}
      </>
    );
  }
);

type ProvincePathProps = {
  provinceName: TopoJSONNames;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
};

const MinimapProvincePath = ({
  provinceName,
  width,
  height,
  strokeWidth,
  fill,
}: ProvincePathProps) => {
  const provinces = useSelectedProvinces();

  return (
    <g style={{ visibility: provinces[provinceName] ? "visible" : "hidden" }}>
      <InnerMinimapProvincePath
        fill={fill}
        provinceName={provinceName}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export default MinimapProvincePath;
