import SelectedProvincesContext from "@context/appstate/SelectedProvincesContext";
import useOutlineData from "@hooks/province/useOutlineData";
import { useTheme } from "@material-ui/core";
import { FSAFeatureType, PathFunctionType, TopoJSONNames } from "@types";
import projection from "@utils/projection";
import { ExtendedFeature } from "d3";
import { memo, useContext } from "react";
import SelectorProvince from "./SelectorProvince";

type InnerProvincePathProps = {
  provinceName: TopoJSONNames;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
  onClick?: () => void;
};

const InnerSelectorProvincePath = memo(
  ({
    provinceName,
    width,
    height,
    strokeWidth,
    fill,
    onClick,
  }: InnerProvincePathProps) => {
    const features = useOutlineData(provinceName);

    let featuresAndPath = features.map((feature: ExtendedFeature) => [
      feature,
      projection(feature, width, height),
    ]) as [FSAFeatureType, PathFunctionType][];

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
  }
);

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

  const { provinces, setProvinces } = useContext(SelectedProvincesContext);
  const isSelected = provinces[provinceName];

  const handleClick = () => {
    setProvinces((old) => ({ [provinceName]: !old[provinceName] }));
  };
  return (
    <g key={provinceName}>
      <InnerSelectorProvincePath
        fill={isSelected ? SELECTED_FILL : fill}
        provinceName={provinceName}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        onClick={handleClick}
      />
    </g>
  );
};

export default SelectorProvincePath;
