import { FSAToCensus } from "@types";

// Function that tests if a d3 scale is of type ScaleQuantize
const isFSAToCensus = (obj: any): obj is FSAToCensus => {
  return obj["A0A"][1] !== undefined;
};

export default isFSAToCensus;
