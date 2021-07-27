import { TopoJSONNames } from "@types";
import ProvincePath from "./ProvincePath";

const AllProvinces = () => {
  return (
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
};

export default AllProvinces;
