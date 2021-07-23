import { TopoJSONNames } from "@types";
import { memo } from "react";
import ProvincePath from "./ProvincePath";

const AllProvinces = () => {
  const Provinces = () => (
    <>
      <ProvincePath provinceName={TopoJSONNames.bc} />
      <ProvincePath provinceName={TopoJSONNames.ab} />
      <ProvincePath provinceName={TopoJSONNames.sk} />
      <ProvincePath provinceName={TopoJSONNames.mb} />
      <ProvincePath provinceName={TopoJSONNames.on} />
      <ProvincePath provinceName={TopoJSONNames.qc} />
      <ProvincePath provinceName={TopoJSONNames.nb} />
      <ProvincePath provinceName={TopoJSONNames.nl} />
      <ProvincePath provinceName={TopoJSONNames.ns} />
      <ProvincePath provinceName={TopoJSONNames.pe} />
      <ProvincePath provinceName={TopoJSONNames.yt} />
      <ProvincePath provinceName={TopoJSONNames.nt} />
      <ProvincePath provinceName={TopoJSONNames.nu} />
    </>
  );
  const MemoizedProvinces = memo(Provinces);
  return <MemoizedProvinces />;
};

export default AllProvinces;
