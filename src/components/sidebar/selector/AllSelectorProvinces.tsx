import { TopoJSONNames } from "@types";
import SelectorProvincePath from "./SelectorProvincePath";

type AllSelectorProvincesProps = {
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
};
export const AllSelectorProvinces = ({
  width,
  height,
  strokeWidth,
  fill,
}: AllSelectorProvincesProps) => {
  return (
    <>
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.bc}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.ab}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.sk}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.mb}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.on}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.qc}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nb}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nl}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.ns}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.pe}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.yt}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nt}
        width={width}
        height={height}
      />
      <SelectorProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nu}
        width={width}
        height={height}
      />
    </>
  );
};
