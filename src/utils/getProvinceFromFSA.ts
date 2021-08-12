import { FSAType, TopoJSONNames, ProvinceOptions } from "@types";

const getProvinceFromFSA = (
  fsa: FSAType,
  fsaSets: { [province in TopoJSONNames]: Set<string> }
) => {
  let selectedEntry = Object.entries(fsaSets).find(([key, value]) =>
    value.has(fsa)
  );
  return selectedEntry ? (selectedEntry[0] as keyof ProvinceOptions) : "";
};

export default getProvinceFromFSA;
