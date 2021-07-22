import { TopoJSONNames } from "@types";
import { memo } from "react";
import ProvincePath from "./ProvincePath";

const AllProvinces = () => {
  const Provinces = () => (
    <>
      <ProvincePath provinceName={TopoJSONNames.BC} />
      <ProvincePath provinceName={TopoJSONNames.AB} />
      <ProvincePath provinceName={TopoJSONNames.SK} />
      <ProvincePath provinceName={TopoJSONNames.MB} />
      <ProvincePath provinceName={TopoJSONNames.ON} />
      <ProvincePath provinceName={TopoJSONNames.QC} />
      <ProvincePath provinceName={TopoJSONNames.NB} />
      <ProvincePath provinceName={TopoJSONNames.NL} />
      <ProvincePath provinceName={TopoJSONNames.NS} />
      <ProvincePath provinceName={TopoJSONNames.PE} />
      <ProvincePath provinceName={TopoJSONNames.YT} />
      <ProvincePath provinceName={TopoJSONNames.NT} />
      <ProvincePath provinceName={TopoJSONNames.NU} />
    </>
  );
  const MemoizedProvinces = memo(Provinces);
  return <MemoizedProvinces />;
};

export default AllProvinces;
