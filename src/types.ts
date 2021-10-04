import { CensusProvinceOption, DonationDataEntry } from "API";
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
  CFSAUID: FSAType;
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

export type ProvinceOption = {
  [i in keyof typeof TopoJSONNames]: string;
};

export type ProvinceOptions = { [province in keyof ProvinceOption]: boolean };

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

export type FSAToFamily = {
  [FSA in FSAType]?: FSAToFamilyEntry;
};

export type FSAToFamilyEntry = {
  [FamilyType in FamilyTypeOption]: DonationDataEntry;
};

export enum NumericalDonationKey {
  NUM_FAM = "NUM_FAM",
  TOT_DONS = "TOT_DONS",
  NUM_DONS = "NUM_DONS",
  MEDIAN_DON = "MEDIAN_DON",
  DON_RATE = "DON_RATE",
}

export type FamilyDataEntry = {
  Year: 2016;
  FSA: FSAType;
  FamilyType: FamilyTypeOption;
  NumFam: number;
  TotDons: number;
  NumDons: number;
  MedianDon: number;
  DonRate: number;
  Place: number | null;
  Name_EN: string | null;
  Name_FR: string | null;
};

export type IncomeDataEntry = {
  Year: number;
  FSA: string;
  IncomeGroup: string;
  NUM_FAM: number;
  TOT_DONS: number;
  NUM_DONS: number;
  MEDIAN_DON: number;
  DON_RATE: number;
  Place: number | null;
  Name_EN: string | null;
  Name_FR: string | null;
};

export type FSAToIncome = {
  [FSA in FSAType]?: FSAToIncomeEntry;
};

export type FSAToCensus = {
  [FSA in FSAType]?: { [x: number]: CensusDataEntry };
};

export type MemberIdProfileOfFSAS = number;

export type CensusDataEntry = {
  __typename: "CensusDataEntry";
  CID: number;
  TOTAL_COUNT?: number | null | undefined;
  TOTAL_PERCENT?: number | null | undefined;
  FSA: string;
};

export type ProfileIDToCensus = {
  [id in MemberIdProfileOfFSAS]: CensusDataEntry;
};

export enum FamilyTypeOption {
  COUPLE_WITH_CHILDREN = "COUPLE_WITH_CHILDREN",
  LONE_PARENT_FAMILIES = "LONE_PARENT_FAMILIES",
  COUPLE_WITHOUT_CHILDREN = "COUPLE_WITHOUT_CHILDREN",
  PERSONS_NOT_IN_CENSUS_FAMILIES = "PERSONS_NOT_IN_CENSUS_FAMILIES",
}

export type FSAToIncomeEntry = {
  [incomeGroup in IncomeTypeOption]: DonationDataEntry;
};

export enum IncomeTypeOption {
  l20K = "l20K",
  l40K = "l40K",
  l60K = "l60K",
  l80K = "l80K",
  l100K = "l100K",
  l150K = "l150K",
  l200K = "l200K",
  l250K = "l250K",
  ge250K = "ge250K",
}

export enum CensusTypeOption {
  TODO = "TODO",
}

export type SingleNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CapitalLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
export type FSAType = `${CapitalLetter}${SingleNumber}${CapitalLetter}`;

export enum SelectedCategoryOption {
  FAMILY = "FAMILY",
  INCOME = "INCOME",
  CENSUS = "CENSUS",
}

export enum SelectorShown {
  MAP = "MAP",
  CHECKBOX = "CHECKBOX",
}

type FamilyInfoOptions = `FAMILY-${FamilyTypeOption}`;
type IncomeInfoOptions = `INCOME-${IncomeTypeOption}`;
type CensusInfoOptions = `CENSUS-${CensusTypeOption}`;

export type SelectedInfoOptions = `${SelectedCategoryOption}-${
  | FamilyTypeOption
  | IncomeTypeOption}-${NumericalDonationKey}`;

export type CIDandCategory = {
  CID: number;
  category: string;
  // compoundKey: string;
};

export type CacheInput = {
  [x in string]: (CensusDataEntry | null)[] | null | undefined;
}[];
