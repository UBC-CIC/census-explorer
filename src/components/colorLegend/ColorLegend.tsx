import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import StandardDeviationContext from "@context/appstate/StandardDeviationProvider";
import useHistogramData from "@hooks/appstate/useHistogramData";
import useCurrentColorScale from "@hooks/quantized/useCurrentColorScale";
import useCurrentScale from "@hooks/quantized/useCurrentScale";
import useFilteredData from "@hooks/quantized/useFilteredData";
import { colorbarStyles } from "@styles";
import { NumericalDonationKey } from "@types";
import getFormatFunction from "@utils/getFormatFunction";
import isScaleQuantize from "@utils/isScaleQuantize";
import * as d3 from "d3";
import * as fc from "d3fc";
import { useContext, useEffect } from "react";

type ColorLegendProps = {};
const ColorLegend = ({}: ColorLegendProps) => {
  const scale = useCurrentColorScale();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const data = useFilteredData();
  const { deviations } = useContext(StandardDeviationContext);

  useEffect(() => {
    d3.select("#colors").selectAll("*").remove();
    if (!data.length) return;
    const width = 80;
    const colorBarHeight = (d3.select("#colorbar").node() as Element)
      ?.clientHeight;
    const container = d3.select("#colors");
    const scaleCopy = scale.copy();
    // Calculate number of ticks
    let mi = d3.min(data) as any;
    let ma = d3.max(data) as any;
    let dev = d3.deviation(data) as any;
    const binWidth = (3.5 * dev) / Math.pow(data.length, 1 / 3);
    const numBins = Math.ceil((ma - mi) / binWidth);
    let numTicks = 0;
    if (isScaleQuantize(scaleCopy)) {
      numTicks = scaleCopy.ticks().length;
    } else {
      numTicks = numBins;
    }
    scaleCopy.range(d3.range(0, colorBarHeight, colorBarHeight / numTicks));

    const domain = [mi, dev * deviations];

    const height = colorBarHeight;

    const paddedDomain = fc.extentLinear().pad([0, 0.01]).padUnit("percent")(
      domain
    );
    if (!domain) return;

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
        selection.selectAll("path").style("fill", (d: any) => scale(d));
      });

    const axisLabel = fc
      .axisRight(yScale)
      .tickFormat(getFormatFunction(selectedNumericalType) as any)
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
  }, [scale, selectedNumericalType, deviations, data]);

  return (
    <svg id={"colorbar"} className={colorbarStyles.colorbar}>
      <g x="0" y="0" id="colors"></g>
    </svg>
  );
};

export default ColorLegend;
