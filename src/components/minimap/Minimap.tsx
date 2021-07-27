import { TopoJSONNames } from "@types";
import { memo } from "react";
import MinimapProvincePath from "../provinces/MinimapProvincePath";
import Miniature from "./miniature";

export type AllMinimapProvincesProps = {
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
};
export const AllMinimapProvinces = ({
  width,
  height,
  strokeWidth,
  fill,
}: AllMinimapProvincesProps) => {
  return (
    <>
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.bc}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.ab}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.sk}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.mb}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.on}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.qc}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nb}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nl}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.ns}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.pe}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.yt}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nt}
        width={width}
        height={height}
      />
      <MinimapProvincePath
        fill={fill}
        strokeWidth={strokeWidth}
        provinceName={TopoJSONNames.nu}
        width={width}
        height={height}
      />
    </>
  );
};

const Minimap = (props: any) => {
  const Memoized = AllMinimapProvinces;

  return (
    <Miniature SVGWidth={500} SVGHeight={500} {...props}>
      <Memoized />
    </Miniature>
  );
};

export default memo(Minimap);
