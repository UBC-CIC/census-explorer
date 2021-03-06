import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import HoveredBoundsContext from "@context/appstate/HoveredBoundsProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import StandardDeviationContext from "@context/appstate/StandardDeviationProvider";
import useBoundsSet from "@hooks/appstate/useBoundsSet";
import useHoveredData from "@hooks/appstate/useHoveredData";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import useSelectedType from "@hooks/appstate/useSelectedType";
import useFSASets from "@hooks/province/useFSASets";
import useCurrentColorScale from "@hooks/quantized/useCurrentColorScale";
import useCurrentScale from "@hooks/quantized/useCurrentScale";
import useFilteredData from "@hooks/quantized/useFilteredData";
import useFilteredDomain from "@hooks/quantized/useFilteredDomain";
import strings from "@l10n/strings";
import {
  makeStyles,
  Slider,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import getFormatFunction from "@utils/getFormatFunction";
import * as d3 from "d3";
import * as fc from "d3fc";
import { memo, useContext, useEffect, useState } from "react";
type HistogramProps = {};

// Allows for the selection of the last child in a d3 selection
d3.selection.prototype.last = function () {
  var last = this.size() - 1;
  return d3.select(this[0][last]);
};

const useStyles = makeStyles((theme) => ({
  vertical: {
    height: "150px",
  },
}));
const margin = { top: 10, right: 30, bottom: 30, left: 20 },
  width = 300 - margin.left - margin.right,
  height = 150 - margin.top - margin.bottom;

const Histogram = (props: HistogramProps) => {
  const selectedType = useSelectedType();
  const { data: hoveredData } = useHoveredData();
  const classes = useStyles();
  const fsaSet = useFSASets();
  const scale = useCurrentScale();
  const { min, max, domain, dev } = useFilteredDomain();
  const colorScale = useCurrentColorScale();
  const { setSelection } = useContext(FSASelectionContext);
  const { selectedNumericalType } = useContext(SelectedNumericalContext);
  const data = useFilteredData();
  const [offset, setOffset] = useState(0);
  const { deviations, setDeviations } = useContext(StandardDeviationContext);
  const { bounds, setBounds } = useContext(HoveredBoundsContext);
  const boundSet = useBoundsSet();
  const theme = useTheme();
  const category = useSelectedCategory();

  //draw and calculate histogram
  useEffect(() => {
    const handleClick = () => {
      setSelection((old) => {
        let newSelection = new Set(old);
        boundSet.forEach((item) => newSelection.add(item));
        return newSelection;
      });
    };
    if (!scale) return;

    d3.select("#histogram").selectAll("*").remove();

    // set the ranges
    var x = d3
      .scaleLinear()
      .domain([min, max] as any)
      .rangeRound([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // set the parameters for the histogram
    var histogram = d3
      .bin<number, number>()
      .value(function (d) {
        return d > max ? max : d;
      })
      .domain(x.domain() as any)
      .thresholds(12 as any);

    // Generate tooltip container
    var tooltip = d3
      .select(".tooltip-area")
      .style("background-color", "black")
      .style("color", "white")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("transition", "opacity .2s")
      .style("pointer-events", "none");

    const mouseover = (event: any, d: d3.Bin<number, number>) => {
      const arr = d.flat();
      arr.push(d.x1!);
      const m = d3.max(arr);
      event.target.style.fill = theme.palette.secondary.main;

      // only update bounds if the bounds values are different
      if (!bounds || bounds[0] !== d.x0! || bounds[1] !== m!) {
        setBounds([d.x0!, m!]);
      }

      tooltip.style("opacity", 1);
    };

    const mouseleave = (event: any, d: any) => {
      setBounds(undefined);
      tooltip.style("opacity", 0);
    };

    const click = (event: any, d: any) => {
      if (!bounds) return;
      handleClick();
    };

    const mousemove = (event: any, d: any) => {
      const text = d3.select(".tooltip-area__text");
      text.text(`${d.length}`);

      tooltip
        .style("top", `${event.clientY - 20}px`)
        .style("opacity", 1)
        .style("left", `${event.clientX + 10}px`);
    };
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      .select("#histogram")
      .append("svg")
      .attr("width", width + margin.left + margin.right - 5)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .on("mouseleave", mouseleave)
      .attr("transform", `translate(${margin.left + 10},${margin.top})`);

    // group the data for the bars
    var bins = histogram(data);

    // Scale the range of the data in the y domain
    const paddedYDomain = fc.extentLinear().pad([0, 0.1]).padUnit("percent")([
      0,
      d3.max(bins, function (d) {
        return (d.length - (d.length / 100) * offset) as any;
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
      .style("cursor", "pointer")
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
        return colorScale(d.x0!);
      })
      .style("stoke-width", "1px")
      .style("stroke", "black")
      .on("mousemove", mousemove)
      .on("click", click)
      .on("mouseover", mouseover);
    // add the x Axis
    svg
      .append("g")
      .attr("transform", "translate(3," + height + ")")
      .style("font-size", "7px")
      .call(
        d3
          .axisBottom(x)
          .tickFormat(getFormatFunction(selectedNumericalType, category) as any)
          .tickSizeOuter(0)
      )
      .selectAll(".tick:last-of-type text")
      .text(
        (d) =>
          `${getFormatFunction(selectedNumericalType, category)(d as any)}+`
      );

    // add the y Axis
    svg.append("g").style("font-size", "7px").call(d3.axisLeft(y));
  }, [
    scale,
    deviations,
    selectedNumericalType,
    setBounds,
    data,
    boundSet,
    theme,
    offset,
    colorScale,
    bounds,
    selectedType,
    setSelection,
    dev,
    max,
    min,
  ]);

  //highlight the bar coorresponding to the hovered value
  useEffect(() => {
    if (!scale) return;
    else {
      d3.select("#histogram")
        .select("svg")
        .select("g")
        .selectAll("rect")
        .style("fill", (d: any) => {
          if (!hoveredData) return colorScale(d.x0!);
          const clampHover = hoveredData > max ? max : hoveredData;
          if (clampHover <= d.x1! && clampHover >= d.x0!) {
            return theme.palette.secondary.main;
          } else return colorScale(d.x0);
        });
    }
  }, [hoveredData, scale, colorScale, data, deviations, theme, max]);

  if (!fsaSet) return null;
  if (!data.length)
    return (
      <div
        style={{
          minHeight: "210px",
        }}
      >
        No Data to Display
      </div>
    );
  const handleDeviationSliderChange = (
    event: any,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setDeviations(newValue);
    }
  };

  const handleOffsetSliderChange = (
    event: any,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setOffset(newValue);
    }
  };

  return (
    <div>
      <div
        id="hist-container"
        style={{
          userSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          WebkitUserSelect: "none",
          display: "flex",
          height: "150px",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <svg
          viewBox="0 0 310 150"
          height="200"
          id={"histogram"}
          onMouseLeave={() => setBounds(undefined)}
        />
        <g className="tooltip-area">
          <text className="tooltip-area__text"></text>
        </g>
        <Typography id="offset-slider" gutterBottom>
          {strings.zoom}
        </Typography>
        <Slider
          className={classes.vertical}
          orientation="vertical"
          defaultValue={1}
          value={offset}
          onChange={handleOffsetSliderChange}
          step={10}
          marks
          min={0}
          max={97}
        />
      </div>
      <Tooltip title="Use this slider to change the X scale of the histogram">
        <Slider
          defaultValue={1}
          valueLabelDisplay="auto"
          value={deviations}
          onChange={handleDeviationSliderChange}
          step={1}
          marks
          min={1}
          max={10}
        />
      </Tooltip>
    </div>
  );
};

export default memo(Histogram);
