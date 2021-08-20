import OpacityContext from "@context/appstate/OpacityProvider";
import useSelectedColor from "@hooks/appstate/useSelectedColor";
import { darken, Theme, useTheme } from "@material-ui/core";
import { FSAFeatureType, FSAType } from "@types";
import React, { memo, useContext, useState } from "react";
import { GeoJSON as GeoJsonComponent } from "react-leaflet";

type FSAProps = {
  feature: FSAFeatureType;
  setHovered: React.Dispatch<React.SetStateAction<FSAType | undefined>>;
  toggleSelected: React.Dispatch<React.SetStateAction<Set<FSAType>>>;
  selected: boolean;
  inBounds: boolean;
};

const getColorFromState = (
  baseColor: string,
  selected: boolean,
  hovered: boolean,
  inBounds: boolean,
  theme: Theme
) => {
  if (selected) {
    return "red";
  }
  if (inBounds) {
    return theme.palette.secondary.main;
  }
  if (hovered) {
    return darken(baseColor, 0.2);
  }
  return baseColor;
};

const FSA = ({
  feature,
  setHovered: setHoveredOuter,
  toggleSelected,
  selected,
  inBounds,
}: FSAProps) => {
  const fsa = feature.properties.CFSAUID as FSAType;
  const color = useSelectedColor(fsa);
  const [hovered, setHovered] = useState(false);
  const { opacity } = useContext(OpacityContext);
  const theme = useTheme();
  const handleClick = () => {
    toggleSelected((old) => {
      if (old.has(fsa)) {
        old.delete(fsa);
        return new Set(old);
      } else return new Set(old).add(fsa);
    });
  };
  const handleMouseOver = () => {
    setHovered(true);
    setHoveredOuter(fsa);
  };
  const handleMouseOut = () => {
    setHovered(false);
    setHoveredOuter(undefined);
  };

  return (
    <>
      <GeoJsonComponent
        data={feature}
        interactive
        eventHandlers={{
          click: handleClick,
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
        }}
        style={() => {
          return {
            weight: selected ? 3 : 1,
            fillColor: getColorFromState(
              color,
              selected,
              hovered,
              inBounds,
              theme
            ),
            fillOpacity: opacity,
            opacity,
            stroke: true,
            color: selected ? "white" : "black",
          };
        }}
      />
    </>
  );
};

export default memo(FSA);
