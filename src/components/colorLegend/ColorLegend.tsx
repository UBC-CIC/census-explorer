import HoveredContext from "@context/appstate/HoveredProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import StandardDeviationContext from "@context/appstate/StandardDeviationProvider";
import useHoveredData from "@hooks/appstate/useHoveredData";
import useCurrentColorScale from "@hooks/quantized/useCurrentColorScale";
import useFilteredData from "@hooks/quantized/useFilteredData";
import useFilteredDomain from "@hooks/quantized/useFilteredDomain";
import { useTheme } from "@material-ui/core";
import { colorbarStyles } from "@styles";
import getFormatFunction from "@utils/getFormatFunction";
import isScaleQuantize from "@utils/isScaleQuantize";
import * as d3 from "d3";
import * as fc from "d3fc";
import { useContext, useEffect } from "react";

const WIDTH = 80;
const INDICATOR_HEIGHT = 10;
type ColorLegendProps = {};
const ColorLegend = ({}: ColorLegendProps) => {
  const { data: hoveredData } = useHoveredData();
  const scale = useCurrentColorScale();
  const { min, max, domain, dev } = useFilteredDomain();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const data = useFilteredData();
  const { deviations } = useContext(StandardDeviationContext);
  const theme = useTheme();

  // draw / calculate the color scale
  useEffect(() => {
    d3.select("#colors").selectAll("*").remove();
    if (!data.length) return;
    // Calculate bounds of scale, number of ticks, height, etc.
    const width = WIDTH;
    const colorBarHeight = (d3.select("#colorbar").node() as Element)
      ?.clientHeight;
    const container = d3.select("#colors");
    const scaleCopy = scale.copy();
    const binWidth = (3.5 * dev) / Math.pow(data.length, 1 / 3);
    const numBins = Math.ceil((max - min) / binWidth);
    let numTicks = 0;
    if (isScaleQuantize(scaleCopy)) {
      numTicks = scaleCopy.ticks().length;
    } else {
      numTicks = numBins;
    }
    scaleCopy.range(d3.range(0, colorBarHeight, colorBarHeight / numTicks));

    const height = colorBarHeight;

    const paddedDomain = fc.extentLinear().pad([0, 0.01]).padUnit("percent")(
      domain
    );
    if (!domain) return;

    const [paddedMin, paddedMax] = paddedDomain;

    const expandedDomain = d3.range(
      paddedMin,
      paddedMax,
      (paddedMax - paddedMin) / height
    );

    const xScale = d3
      .scaleBand()
      .domain([0, 1] as any)
      .range([0, width]);

    const yScale = d3.scaleLinear().domain(paddedDomain).range([height, 0]);

    //Draw all the individual rectangles
    const svgBar = fc
      .autoBandwidth(fc.seriesSvgBar())
      .xScale(xScale)
      .yScale(yScale)
      .crossValue(0)
      .baseValue((_: any, i: any) => (i > 0 ? expandedDomain[i - 1] : 0))
      .mainValue((d: any) => d)
      .decorate((selection: any) => {
        selection.selectAll("path").style("fill", (d: any) => {
          return scale(d);
        });
      });

    const axisLabel = fc
      .axisRight(yScale)
      .tickFormat(getFormatFunction(selectedNumericalType) as any)
      .tickSizeOuter(0);

    const legendSvg = container
      .append("svg")
      .attr("id", "legendSVG")
      .attr("height", height)
      .attr("width", width);

    const legendBar = legendSvg.append("g").datum(expandedDomain).call(svgBar);

    const barWidth = Math.abs(legendBar.node()!.getBoundingClientRect().x);
    legendSvg
      .append("g")
      .attr("transform", `translate(${barWidth + 10})`)
      .datum(expandedDomain)
      .call(axisLabel)
      .select(".domain")
      .attr("visibility", "hidden");
    container.style("margin", "1em");
  }, [scale, selectedNumericalType, deviations, data, dev, domain, min, max]);

  // Draw the bar representing the hovered value
  useEffect(() => {
    const colorBarHeight = (d3.select("#colorbar").node() as Element)
      ?.clientHeight;
    const height = colorBarHeight;
    const paddedDomain = fc.extentLinear().pad([0, 0]).padUnit("percent")(
      domain
    );
    if (!domain) return;
    const [paddedMin, paddedMax] = paddedDomain;
    const percent = Math.min(
      hoveredData ? (hoveredData - min) / (max - min) : 0,
      1
    );

    const clampedPercent = Math.min(
      height - height * percent,
      height - INDICATOR_HEIGHT
    );

    const format = getFormatFunction(selectedNumericalType);
    d3.select("#colorbar-hover-indicator")
      .select("text")
      .style("font-size", "10px")
      .attr("width", 20)
      .attr("height", INDICATOR_HEIGHT)
      .attr("transform", `translate(0,${clampedPercent + INDICATOR_HEIGHT})`)
      .text(hoveredData ? format(hoveredData) : "");

    d3.select("#colorbar-hover-indicator")
      .select("rect")
      .attr("width", 80)
      .attr("height", INDICATOR_HEIGHT)
      .attr("transform", `translate(0,${clampedPercent})`)
      .style("fill", (d: any) => {
        if (!hoveredData) return "#0000";
        return theme.palette.secondary.main;
      });
  }, [
    hoveredData,
    scale,
    theme,
    data,
    deviations,
    selectedNumericalType,
    domain,
  ]);
  return (
    <svg id={"colorbar"} className={colorbarStyles.colorbar}>
      <g x="0" y="0" id="colors"></g>
      <g id="colorbar-hover-indicator">
        <rect x="0" y="0" />
        <text />
      </g>
    </svg>
  );
};

export default ColorLegend;
