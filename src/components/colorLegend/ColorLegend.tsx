import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedScale from "@hooks/appstate/useSelectedScale";
import { colorbarStyles } from "@styles";
import getFormatFunction from "@utils/getFormatFunction";
import * as d3 from "d3";
import * as fc from "d3fc";
import { useEffect } from "react";

type ColorLegendProps = { height: number };
const ColorLegend = ({ height }: ColorLegendProps) => {
  const [scale, selectorKey, numericalKey] = useSelectedScale();
  const [data] = useSelectedData();

  useEffect(() => {
    // Construct Axis and Ticks
    // const colorBarWidth = 20;
    // const colorBarHeight = (d3.select("#colorbar").node() as Element)
    //   ?.clientHeight;
    // const scaleCopy = scale.copy();
    // let numTicks = scaleCopy.ticks().length;
    // scaleCopy.range(d3.range(0, colorBarHeight, colorBarHeight / numTicks));
    // const axis = fc
    //   .axisRight(scaleCopy as any)
    //   .tickFormat(getFormatFunction(numericalKey) as any);
    // d3.select("#axis")
    //   .call(axis as any)
    //   .attr("width", colorBarWidth)
    //   .attr("height", colorBarHeight)
    //   .attr("transform", `translate(0, 0)`);
    // d3.select("#colorbar").attr(
    //   "viewBox",
    //   `0 0 ${colorBarWidth} ${colorBarHeight}`
    // );
  }, [scale, height, numericalKey]);

  useEffect(() => {
    d3.select("#colors").selectAll("*").remove();
    const width = 80;
    const colorBarHeight = (d3.select("#colorbar").node() as Element)
      ?.clientHeight;
    const container = d3.select("#colors");
    const scaleCopy = scale.copy();
    let numTicks = scaleCopy.ticks().length;
    scaleCopy.range(d3.range(0, colorBarHeight, colorBarHeight / numTicks));
    const domain = scaleCopy.domain();
    const colourScale = d3
      .scaleSequential(d3.interpolateOranges)
      .domain(domain);

    const height = colorBarHeight;

    const paddedDomain = fc.extentLinear().pad([0.1, 0.1]).padUnit("percent")(
      domain
    );
    const [min, max] = paddedDomain;
    const expandedDomain = d3.range(min, max, (max - min) / height);

    const xScale = d3
      .scaleBand()
      .domain([0, 1] as any)
      .range([0, width]);

    const yScale = d3.scaleLinear().domain(paddedDomain).range([height, 0]);

    const svgBar = fc
      .autoBandwidth(fc.seriesSvgBar())
      .xScale(xScale)
      .yScale(yScale)
      .crossValue(0)
      .baseValue((_: any, i: any) => (i > 0 ? expandedDomain[i - 1] : 0))
      .mainValue((d: any) => d)
      .decorate((selection: any) => {
        selection.selectAll("path").style("fill", (d: any) => colourScale(d));
      });

    const axisLabel = fc
      .axisRight(yScale)
      .tickFormat(getFormatFunction(numericalKey) as any)
      .tickSizeOuter(0);
    // .tickValues([...domain, (domain[1] + domain[0]) / 2])

    const legendSvg = container
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    const legendBar = legendSvg.append("g").datum(expandedDomain).call(svgBar);

    const barWidth = Math.abs(legendBar.node()!.getBoundingClientRect().x);
    legendSvg
      .append("g")
      .attr("transform", `translate(${barWidth})`)
      .datum(expandedDomain)
      .call(axisLabel)
      .select(".domain")
      .attr("visibility", "hidden");

    // Draw to SVG
    // legendSvg.append("g").datum(expandedDomain).call(svgBar);
    // d3.select("#colors").attr("transform", `translate(5,0)`);
    container.style("margin", "1em");
  }, [scale, height]);

  return (
    <svg id={"colorbar"} className={colorbarStyles.colorbar}>
      <g x="0" y="0" id="colors"></g>
      {/* <g x="0" y="0" id="axis"></g> */}
    </svg>
  );
};

export default ColorLegend;
