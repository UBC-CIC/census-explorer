import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedScale from "@hooks/appstate/useSelectedScale";
import useCurrentScale from "@hooks/quantized/useCurrentScale";
import { colorbarStyles } from "@styles";
import getFormatFunction from "@utils/getFormatFunction";
import * as d3 from "d3";
import * as fc from "d3fc";
import { useEffect } from "react";

type ColorLegendProps = { height: number };
const ColorLegend = ({ height }: ColorLegendProps) => {
  const scale = useCurrentScale();
  const [, , numericalKey] = useSelectedScale();

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

    const legendSvg = container
      .append("svg")
      .attr("height", height)
      .attr("width", width);

    const legendBar = legendSvg.append("g").datum(expandedDomain).call(svgBar);

    const barWidth = Math.abs(legendBar.node()!.getBoundingClientRect().x);
    legendSvg
      .append("g")
      .attr("transform", `translate(${barWidth + 5})`)
      .datum(expandedDomain)
      .call(axisLabel)
      .select(".domain")
      .attr("visibility", "hidden");
    container.style("margin", "1em");
  }, [scale, height, numericalKey]);

  return (
    <svg id={"colorbar"} className={colorbarStyles.colorbar}>
      <g x="0" y="0" id="colors"></g>
    </svg>
  );
};

export default ColorLegend;
