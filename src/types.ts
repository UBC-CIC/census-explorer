import { ExtendedFeature, GeoGeometryObjects } from "d3";

export interface Topology {
  type: "Topology";
  arcs?: ((number[] | null)[] | null)[] | null;
  transform: Transform;
  objects: Objects;
}
export interface Transform {
  scale?: number[] | null;
  translate?: number[] | null;
}
export interface Objects {
  [name: string]: GeometryCollection;
}
export interface GeometryCollection {
  type: string;
  geometries?: GeometriesEntity[] | null;
}
export interface GeometriesEntity {
  arcs?: ((number | number[] | null)[] | null)[] | null;
  type: string;
  properties: Properties;
}
export interface Properties {
  CFSAUID: string;
  PRUID: string;
  PRNAME: string;
}

export type PathFunctionType = () => string | null;

export type FSAFeatureType = ExtendedFeature<
  GeoGeometryObjects | null,
  Properties
>;

export type CanadaTopologyType = TopoJSON.Topology & {
  properties: { CFSAUID: string; PRUID: string; PRNAME: string };
};

export enum TopoJSONNames {
  // CANADA = "canada",
  ab = "ab",
  bc = "bc",
  mb = "mb",
  nb = "nb",
  nl = "nl",
  ns = "ns",
  nt = "nt",
  nu = "nu",
  on = "on",
  pe = "pe",
  qc = "qc",
  sk = "sk",
  yt = "yt",
}

export enum LongProvinceNames {
  ab = "Alberta",
  bc = "British Columbia",
  mb = "Manitoba",
  nb = "New Brunswick",
  nl = "Newfoundland and Labrador",
  ns = "Nova Scotia",
  nt = "Northwest Territories",
  nu = "Nunavut",
  on = "Ontario",
  pe = "Prince Edward Island",
  qc = "Quebec",
  sk = "Saskatchewan",
  yt = "Yukon",
}

export type EnumType = { [s: number]: string };

export type ValueType = {
  mode: "idle" | "panning" | "zooming";
  focus: boolean;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  miniatureOpen: boolean;
  SVGMinX: number;
  SVGMinY: number;
  SVGWidth: number;
  SVGHeight: number;
  viewerWidth: number;
  viewerHeight: number;
};
