import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedScale from "@hooks/appstate/useSelectedScale";
import { colorbarStyles } from "@styles";
import { NumericalDonationKey } from "@types";
import getFormatFunction from "@utils/getFormatFunction";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import * as fc from "d3fc";

type ColorLegendProps = { width: number };
const ColorLegend = ({ width }: ColorLegendProps) => {
  const [scale, selectorKey, numericalKey] = useSelectedScale();
  const [data] = useSelectedData();

  useEffect(() => {
    // Construct Axis and Ticks
    const colorBarWidth = (d3.select("#colorbar").node() as Element)
      ?.clientWidth;
    const scaleCopy = scale.copy();
    let numTicks = scaleCopy.ticks().length;
    scaleCopy.range(d3.range(0, colorBarWidth, colorBarWidth / numTicks));
    const axis = fc
      .axisBottom(scaleCopy as any)
      .tickFormat(getFormatFunction(numericalKey) as any)
      .decorate((s: any) => {
        s.attr("fill", "red");
      });

    d3.select("#axis")
      .call(axis as any)
      .attr("width", colorBarWidth)
      .attr("height", 20)
      .attr("transform", `translate(10, 0)`);
    d3.select("#colorbar").attr("viewBox", `0 0 ${colorBarWidth} 20`);
  }, [scale, width, numericalKey]);

  useEffect(() => {
    const colorBarWidth = (d3.select("#colorbar").node() as Element)
      ?.clientWidth;
    const scaleCopy = scale.copy();
    console.log(scaleCopy.range());
  }, [scale, width]);

  return (
    <svg id={"colorbar"} className={colorbarStyles.colorbar}>
      <g x="x" id="colors"></g>
      <g x="0" id="axis"></g>
    </svg>
  );
};

export default ColorLegend;
