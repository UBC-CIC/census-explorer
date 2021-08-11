import SelectedProvincesContext from "@context/appstate/SelectedProvincesContext";
import useOutlineData from "@hooks/province/useOutlineData";
import { useTheme } from "@material-ui/core";
import { FSAFeatureType, PathFunctionType, TopoJSONNames } from "@types";
import projection from "@utils/projection";
import { ExtendedFeature } from "d3";
import { memo, useContext, useMemo } from "react";
import SelectorProvince from "./SelectorProvince";

type InnerProvincePathProps = {
  featuresAndPath: [FSAFeatureType, PathFunctionType][];
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
  onClick?: () => void;
};

const InnerSelectorProvincePath = ({
  featuresAndPath,
  width,
  height,
  strokeWidth,
  fill,
  onClick,
}: InnerProvincePathProps) => {
  return (
    <>
      {featuresAndPath.map(([feature, item], index) => (
        <SelectorProvince
          key={index}
          fill={fill}
          strokeWidth={strokeWidth}
          feature={feature}
          path={item()}
          onClick={onClick}
        />
      ))}
    </>
  );
};

type ProvincePathProps = {
  provinceName: TopoJSONNames;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
};

const SelectorProvincePath = ({
  provinceName,
  width,
  height,
  strokeWidth,
  fill,
}: ProvincePathProps) => {
  const SELECTED_FILL = useTheme().palette.primary.main;
  const features = useOutlineData(provinceName);

  let featuresAndPath = useMemo(
    () =>
      features.map((feature: ExtendedFeature) => [
        feature,
        projection(feature, width, height),
      ]) as [FSAFeatureType, PathFunctionType][],
    []
  );
  const { provinces, setProvinces } = useContext(SelectedProvincesContext);
  const isSelected = provinces[provinceName];

  const handleClick = () => {
    setProvinces((old) => ({ [provinceName]: !old[provinceName] }));
  };

  return (
    <g key={provinceName}>
      <InnerSelectorProvincePath
        fill={isSelected ? SELECTED_FILL : fill}
        featuresAndPath={featuresAndPath}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        onClick={handleClick}
      />
    </g>
  );
};

export default SelectorProvincePath;
