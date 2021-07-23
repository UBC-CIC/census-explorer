import React from "react";
import PropTypes from "prop-types";
import IconArrow from "./icon-arrow";
import { POSITION_LEFT, POSITION_RIGHT } from "react-svg-pan-zoom";

export default function MiniatureToggleButton({
  value,
  onChangeValue,
  position,
}) {
  let style = {
    width: "24px",
    height: "24px",
    display: "block",
    position: "absolute",
    bottom: 0,
    [position === POSITION_LEFT ? "left" : "right"]: "0px",
    background: "rgba(19, 20, 22, 0.901961)",
    border: 0,
    padding: 0,
    outline: 0,
    color: "#fff",
  };

  return (
    <button type="button" style={style} onClick={() => onChangeValue(value)}>
      <IconArrow open={value.miniatureOpen} position={position} />
    </button>
  );
}

MiniatureToggleButton.propTypes = {
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
};
