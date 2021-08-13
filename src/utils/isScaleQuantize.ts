import * as d3 from "d3";
// Function that tests if a d3 scale is of type ScaleQuantize
const isScaleQuantize = (scale: any): scale is d3.ScaleQuantize<any, any> => {
  return scale.ticks !== undefined;
};

export default isScaleQuantize;
