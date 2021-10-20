import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import useHoveredData from "@hooks/appstate/useHoveredData";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import getFormatFunction from "@utils/getFormatFunction";

type HoverAreaProps = {};

const HoverArea = (props: HoverAreaProps) => {
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove as any);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
    };
  }, []);

  const hoveredData = useHoveredData();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const category = useSelectedCategory();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = _.throttle((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY - 45 });
  }, 100);

  return (
    <div>
      {!!hoveredData.fsa && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: 10000,
            top: mousePos.y,
            left: mousePos.x,
            backgroundColor: "white",
            borderRadius: "5px",
            padding: 5,
          }}
        >
          <div>{hoveredData.fsa}</div>

          <div>
            {getFormatFunction(
              selectedNumericalType,
              category
            )(hoveredData.data)}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverArea;
