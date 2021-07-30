import useSelectedData from "@hooks/appstate/useSelectedData";
import * as d3 from "d3";
type ColorLegendProps = {};
const ColorLegend = (props: ColorLegendProps) => {
  const selectedData = useSelectedData();
  // const numericalData = Object.values(selectedData)
  //   .map((data) => {
  //     return data.TotDons;
  //   })
  //   .filter(Boolean);

  return <div />;
};

export default ColorLegend;
