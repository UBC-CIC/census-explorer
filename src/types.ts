import { ExtendedFeature, GeoGeometryObjects } from "d3";
import { EmptyStatement } from "typescript";

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
  [FamilyType in FamilyTypeOption]: FamilyDataEntry;
};

export enum NumericalDonationKey {
  NumFam = "NumFam",
  TotDons = "TotDons",
  NumDons = "NumDons",
  MedianDon = "MedianDon",
  DonRate = "DonRate",
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
  NumFam: number;
  TotDons: number;
  NumDons: number;
  MedianDon: number;
  DonRate: number;
  Place: number | null;
  Name_EN: string | null;
  Name_FR: string | null;
};

export type FSAToIncome = {
  [FSA in FSAType]?: FSAToIncomeEntry;
};

export type FSAToCensus = {
  [FSA in FSAType]?: ProfileIDToCensus;
};

export type MemberIdProfileOfFSAS = number;

export type CensusDataEntry = {
  CENSUS_YEAR: number;
  GEO_CODE_POR: string;
  GEO_LEVEL: number;
  GEO_NAME: string;
  GNR: number;
  GNR_LF: number;
  DATA_QUALITY_FLAG: number;
  ALT_GEO_CODE: string;
  dim_profile_of_fsas: string;
  member_id_profile_of_fsas: number;
  notes_profile_of_fsas: number;
  dim_sex3_member_id1_total: number;
  dim_sex3_member_id2_male: number | null;
  dim_sex3_member_id3_female: number | null;
};

export type ProfileIDToCensus = {
  [id in MemberIdProfileOfFSAS]: CensusDataEntry;
};

export enum FamilyTypeOption {
  COUPLE_WITH_CHILDREN = "Couple with children",
  LONE_PARENT_FAMILIES = "Lone-parent families",
  COUPLE_WITHOUT_CHILDREN = "Couple without children",
  PERSONS_NOT_IN_CENSUS_FAMILIES = "Persons not in census families",
}

export type FSAToIncomeEntry = {
  [incomeGroup in IncomeTypeOption]: IncomeDataEntry;
};

export enum IncomeTypeOption {
  l20K = "<$20K",
  l40K = "$20K < $40K",
  l60K = "$40K < $60K",
  l80K = "$60K < $80K",
  l100K = "$80K < $100K",
  l150K = "$100K < $150K",
  l200K = "$150K < $200K",
  l250K = " $200K < $250K",
  ge250K = ">= $250K",
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
