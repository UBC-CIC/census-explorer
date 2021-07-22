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
  AB = "ab",
  BC = "bc",
  // CANADA = "canada",
  MB = "mb",
  NB = "nb",
  NL = "nl",
  NS = "ns",
  NT = "nt",
  NU = "nu",
  ON = "on",
  PE = "pe",
  QC = "qc",
  SK = "sk",
  YT = "yt",
}

export type EnumType = { [s: number]: string };
