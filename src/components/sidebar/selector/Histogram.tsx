import Spinner from "@components/Spinner";
import useHistogramData from "@hooks/appstate/useHistogramData";
import useSelectedData from "@hooks/appstate/useSelectedData";
import useSelectedScale, {
  useScaleLoading,
} from "@hooks/appstate/useSelectedScale";
import { Slider, Typography } from "@material-ui/core";
import getFormatFunction from "@utils/getFormatFunction";
import * as d3 from "d3";
import * as fc from "d3fc";
import { useEffect, useState } from "react";
type HistogramProps = {};
const Histogram = (props: HistogramProps) => {
  const loading = useScaleLoading();
  const [scale, , numericalKey] = useSelectedScale();
  const [selected, type] = useSelectedData();
  const data = useHistogramData();
  const [deviations, setDeviations] = useState(1);
  //draw and calculate histogram
  useEffect(() => {
    if (!scale) return;
    const scaleCopy = scale.copy();
    let min = d3.min(data) as any;
    let max = d3.max(data) as any;
    let dev = d3.deviation(data) as any;
    const binWidth = (3.5 * dev) / Math.pow(data.length, 1 / 3);
    const numBins = Math.ceil((max - min) / binWidth);

    d3.select("#histogram").selectAll("*").remove();

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 20 },
      width = 300 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

    // set the ranges
    var x = d3
      .scaleLinear()
      .domain([min, dev * deviations] as any)
      .rangeRound([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // set the parameters for the histogram
    var histogram = d3
      .bin<number, number>()
      .value(function (d) {
        return d;
      })
      .domain(x.domain() as any)
      .thresholds(x.ticks(numBins) as any);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      .select("#histogram")
      .append("svg")
      .attr("width", width + margin.left + margin.right - 5)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left + 10},${margin.top})`);

    // group the data for the bars
    var bins = histogram(data);

    // Scale the range of the data in the y domain
    const paddedYDomain = fc.extentLinear().pad([0, 0.1]).padUnit("percent")([
      0,
      d3.max(bins, function (d) {
        return d.length as any;
      }),
    ]);
    y.domain(paddedYDomain);

    // append the bar rectangles to the svg element
    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 1)
      .attr("transform", function (d) {
        return `translate(${x(d.x0!)},${y(d.length)})`;
      })
      .attr("width", function (d) {
        return 5;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", (d) => {
        return scale(d.x0!);
      })
      .style("stoke-width", "1px")
      .style("stroke", "black");

    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(3," + height + ")")
      .style("font-size", "7px")
      .call(
        d3
          .axisBottom(x)
          .tickFormat(getFormatFunction(numericalKey) as any)
          .tickSizeOuter(0)
      );

    // add the y Axis
    svg.append("g").style("font-size", "7px").call(d3.axisLeft(y));
  }, [scale, deviations, numericalKey, data]);

  if (loading) return <Spinner />;
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setDeviations(newValue);
    }
  };
  return (
    <div>
      <svg viewBox="0 0 310 150" id={"histogram"}></svg>
      <Typography id="input-slider" gutterBottom>
        Standard Deviations: {deviations}
      </Typography>
      <Slider
        defaultValue={1}
        valueLabelDisplay="auto"
        value={deviations}
        onChange={handleSliderChange}
        step={1}
        marks
        min={1}
        max={10}
      />
    </div>
  );
};

export default Histogram;
