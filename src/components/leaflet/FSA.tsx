import OpacityContext from "@context/appstate/OpacityProvider";
import useSelectedColor from "@hooks/appstate/useSelectedColor";
import { darken } from "@material-ui/core";
import { FSAFeatureType, FSAType } from "@types";
import { useContext, useState } from "react";
import { GeoJSON as GeoJsonComponent } from "react-leaflet";

type FSAProps = {
  feature: FSAFeatureType;
};

const getColorFromState = (
  baseColor: string,
  selected: boolean,
  hovered: boolean
) => {
  if (!selected && !hovered) {
    return baseColor;
  }
  if (selected) {
    return "red";
  }
  if (hovered) {
    return darken(baseColor, 0.2);
  }
  return baseColor;
};

const FSA = ({ feature }: FSAProps) => {
  const color = useSelectedColor(feature.properties.CFSAUID);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const { opacity } = useContext(OpacityContext);
  const handleClick = () => {
    setSelected(!selected);
  };
  const handleMouseOver = () => {
    setHovered(true);
  };
  const handleMouseOut = () => {
    setHovered(false);
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
            fillColor: getColorFromState(color, selected, hovered),
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

export default FSA;
