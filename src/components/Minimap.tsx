import { CSSProperties, ReactNode } from "react";
import { Value } from "react-svg-pan-zoom";
import { applyToPoints, inverse, Matrix } from "transformation-matrix";

type MinimapProps = {
  value?: Value;
  onChangeValue: (value: boolean) => void;
  children?: ReactNode | ReactNode[];
  position: "left" | "right" | "none";
  background: string;
  SVGBackground: string;
  width: number;
  height: number;
};

const Minimap = ({
  value,
  onChangeValue,
  children,
  position,
  background,
  SVGBackground,
  width,
  height,
}: MinimapProps) => {
  if (!value) return null;
  const { SVGWidth, SVGHeight, viewerWidth, viewerHeight } = value;

  const ratio = SVGHeight / SVGWidth;
  let zoomToFit = ratio >= 1 ? height / SVGHeight : width / SVGWidth;

  let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = applyToPoints(
    inverse(value as Matrix),
    [
      { x: 0, y: 0 },
      { x: viewerWidth, y: viewerHeight },
    ]
  );

  const minimapStyle: CSSProperties = {
    width,
    height,
    position: "absolute",
    bottom: 0,
    border: "1px solid black",
    margin: "5px",
  };
  return <div style={minimapStyle}> hello</div>;
};

export default Minimap;
