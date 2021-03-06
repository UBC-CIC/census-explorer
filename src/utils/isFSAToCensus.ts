import { FSAToCensus } from "@types";
import { isEmpty } from "lodash";

// Function that tests if a d3 scale is of type ScaleQuantize
const isFSAToCensus = (obj: any): obj is FSAToCensus => {
  if (isEmpty(obj)) return false;
  return obj["A0A"][1] !== undefined;
};

export default isFSAToCensus;
