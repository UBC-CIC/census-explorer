/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelCensusDataEntryConnection = {
  __typename: "ModelCensusDataEntryConnection",
  items?:  Array<CensusDataEntry | null > | null,
  nextToken?: string | null,
};

export type CensusDataEntry = {
  __typename: "CensusDataEntry",
  id: string,
  FSA: string,
  CID?: number | null,
  TOTAL_COUNT?: number | null,
  MALE_COUNT?: number | null,
  FEMALE_COUNT?: number | null,
  PROVINCE: CensusProvinceOption,
  CATEGORY: string,
  HEADER: string,
  TOTAL_PERCENT?: number | null,
  createdAt: string,
  updatedAt: string,
};

export enum CensusProvinceOption {
  CAN = "CAN",
  AB = "AB",
  BC = "BC",
  MB = "MB",
  NB = "NB",
  NL = "NL",
  NS = "NS",
  NT = "NT",
  NU = "NU",
  ON = "ON",
  PE = "PE",
  QC = "QC",
  SK = "SK",
  YT = "YT",
}


export type ModelFloatKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum DonationTypeOption {
  COUPLE_WITH_CHILDREN = "COUPLE_WITH_CHILDREN",
  LONE_PARENT_FAMILIES = "LONE_PARENT_FAMILIES",
  COUPLE_WITHOUT_CHILDREN = "COUPLE_WITHOUT_CHILDREN",
  PERSONS_NOT_IN_CENSUS_FAMILIES = "PERSONS_NOT_IN_CENSUS_FAMILIES",
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


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelDonationDataEntryFilterInput = {
  FSA?: ModelStringInput | null,
  TYPE?: ModelDonationTypeOptionInput | null,
  YEAR?: ModelFloatInput | null,
  NUM_FAM?: ModelFloatInput | null,
  TOT_DONS?: ModelFloatInput | null,
  NUM_DONS?: ModelFloatInput | null,
  MEDIAN_DON?: ModelFloatInput | null,
  DON_RATE?: ModelFloatInput | null,
  PROVINCE?: ModelProvinceOptionInput | null,
  and?: Array< ModelDonationDataEntryFilterInput | null > | null,
  or?: Array< ModelDonationDataEntryFilterInput | null > | null,
  not?: ModelDonationDataEntryFilterInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelDonationTypeOptionInput = {
  eq?: DonationTypeOption | null,
  ne?: DonationTypeOption | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelProvinceOptionInput = {
  eq?: ProvinceOption | null,
  ne?: ProvinceOption | null,
};

export enum ProvinceOption {
  AB = "AB",
  BC = "BC",
  MB = "MB",
  NB = "NB",
  NL = "NL",
  NS = "NS",
  NT = "NT",
  NU = "NU",
  ON = "ON",
  PE = "PE",
  QC = "QC",
  SK = "SK",
  YT = "YT",
}


export type ModelDonationDataEntryConnection = {
  __typename: "ModelDonationDataEntryConnection",
  items?:  Array<DonationDataEntry | null > | null,
  nextToken?: string | null,
};

export type DonationDataEntry = {
  __typename: "DonationDataEntry",
  id: string,
  FSA: string,
  TYPE: DonationTypeOption,
  YEAR?: number | null,
  NUM_FAM?: number | null,
  TOT_DONS?: number | null,
  NUM_DONS?: number | null,
  MEDIAN_DON?: number | null,
  DON_RATE?: number | null,
  PROVINCE?: ProvinceOption | null,
  createdAt: string,
  updatedAt: string,
};

export type CreateDonationDataEntryInput = {
  id?: string | null,
  FSA: string,
  TYPE: DonationTypeOption,
  YEAR?: number | null,
  NUM_FAM?: number | null,
  TOT_DONS?: number | null,
  NUM_DONS?: number | null,
  MEDIAN_DON?: number | null,
  DON_RATE?: number | null,
  PROVINCE?: ProvinceOption | null,
};

export type ModelDonationDataEntryConditionInput = {
  FSA?: ModelStringInput | null,
  TYPE?: ModelDonationTypeOptionInput | null,
  YEAR?: ModelFloatInput | null,
  NUM_FAM?: ModelFloatInput | null,
  TOT_DONS?: ModelFloatInput | null,
  NUM_DONS?: ModelFloatInput | null,
  MEDIAN_DON?: ModelFloatInput | null,
  DON_RATE?: ModelFloatInput | null,
  PROVINCE?: ModelProvinceOptionInput | null,
  and?: Array< ModelDonationDataEntryConditionInput | null > | null,
  or?: Array< ModelDonationDataEntryConditionInput | null > | null,
  not?: ModelDonationDataEntryConditionInput | null,
};

export type UpdateDonationDataEntryInput = {
  FSA?: string | null,
  TYPE?: DonationTypeOption | null,
  YEAR?: number | null,
  NUM_FAM?: number | null,
  TOT_DONS?: number | null,
  NUM_DONS?: number | null,
  MEDIAN_DON?: number | null,
  DON_RATE?: number | null,
  PROVINCE?: ProvinceOption | null,
};

export type DeleteDonationDataEntryInput = {
  id: string,
};

export type CreateCensusDataEntryInput = {
  id?: string | null,
  FSA: string,
  CID?: number | null,
  TOTAL_COUNT?: number | null,
  MALE_COUNT?: number | null,
  FEMALE_COUNT?: number | null,
  PROVINCE: CensusProvinceOption,
  CATEGORY: string,
  HEADER: string,
  TOTAL_PERCENT?: number | null,
};

export type ModelCensusDataEntryConditionInput = {
  FSA?: ModelStringInput | null,
  CID?: ModelFloatInput | null,
  TOTAL_COUNT?: ModelFloatInput | null,
  MALE_COUNT?: ModelFloatInput | null,
  FEMALE_COUNT?: ModelFloatInput | null,
  PROVINCE?: ModelCensusProvinceOptionInput | null,
  CATEGORY?: ModelStringInput | null,
  HEADER?: ModelStringInput | null,
  TOTAL_PERCENT?: ModelFloatInput | null,
  and?: Array< ModelCensusDataEntryConditionInput | null > | null,
  or?: Array< ModelCensusDataEntryConditionInput | null > | null,
  not?: ModelCensusDataEntryConditionInput | null,
};

export type ModelCensusProvinceOptionInput = {
  eq?: CensusProvinceOption | null,
  ne?: CensusProvinceOption | null,
};

export type UpdateCensusDataEntryInput = {
  FSA?: string | null,
  CID?: number | null,
  TOTAL_COUNT?: number | null,
  MALE_COUNT?: number | null,
  FEMALE_COUNT?: number | null,
  PROVINCE?: CensusProvinceOption | null,
  CATEGORY?: string | null,
  HEADER?: string | null,
  TOTAL_PERCENT?: number | null,
};

export type DeleteCensusDataEntryInput = {
  id: string,
};

export type similarSearchInput = {
  FSAs: Array< string >,
  CID?: number | null,
  TYPE?: DonationTypeOption | null,
  RATE_DISTANCE?: number | null,
  FLAT_DISTANCE?: number | null,
};

export type similarSearchOutput = {
  __typename: "similarSearchOutput",
  FSAs?: SimilarResponseFSAs | null,
  statusCode?: number | null,
  numResults?: number | null,
};

export type SimilarResponseFSAs = {
  __typename: "SimilarResponseFSAs",
  donation: Array< string >,
  census: Array< string >,
};

export type ModelCensusDataEntryFilterInput = {
  FSA?: ModelStringInput | null,
  CID?: ModelFloatInput | null,
  TOTAL_COUNT?: ModelFloatInput | null,
  MALE_COUNT?: ModelFloatInput | null,
  FEMALE_COUNT?: ModelFloatInput | null,
  PROVINCE?: ModelCensusProvinceOptionInput | null,
  CATEGORY?: ModelStringInput | null,
  HEADER?: ModelStringInput | null,
  TOTAL_PERCENT?: ModelFloatInput | null,
  and?: Array< ModelCensusDataEntryFilterInput | null > | null,
  or?: Array< ModelCensusDataEntryFilterInput | null > | null,
  not?: ModelCensusDataEntryFilterInput | null,
};

export type getAllHeadersCategoriesQuery = {
  censusDataByProvinceCID?:  {
    __typename: "ModelCensusDataEntryConnection",
    nextToken?: string | null,
    items?:  Array< {
      __typename: "CensusDataEntry",
      CID?: number | null,
      HEADER: string,
      CATEGORY: string,
    } | null > | null,
  } | null,
};

export type getCensusDataByProvinceCIDQueryVariables = {
  PROVINCE?: CensusProvinceOption | null,
  CID?: ModelFloatKeyConditionInput | null,
};

export type getCensusDataByProvinceCIDQuery = {
  censusDataByProvinceCID?:  {
    __typename: "ModelCensusDataEntryConnection",
    items?:  Array< {
      __typename: "CensusDataEntry",
      CID?: number | null,
      TOTAL_COUNT?: number | null,
      TOTAL_PERCENT?: number | null,
      FSA: string,
    } | null > | null,
  } | null,
};

export type getAllFamilyDataQQueryVariables = {
  TYPE?: DonationTypeOption | null,
  FSA?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDonationDataEntryFilterInput | null,
};

export type getAllFamilyDataQQuery = {
  donationDataByTypeFSA?:  {
    __typename: "ModelDonationDataEntryConnection",
    items?:  Array< {
      __typename: "DonationDataEntry",
      FSA: string,
      TYPE: DonationTypeOption,
      NUM_FAM?: number | null,
      TOT_DONS?: number | null,
      NUM_DONS?: number | null,
      MEDIAN_DON?: number | null,
      DON_RATE?: number | null,
      PROVINCE?: ProvinceOption | null,
    } | null > | null,
  } | null,
};

export type CreateDonationDataEntryMutationVariables = {
  input: CreateDonationDataEntryInput,
  condition?: ModelDonationDataEntryConditionInput | null,
};

export type CreateDonationDataEntryMutation = {
  createDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDonationDataEntryMutationVariables = {
  input: UpdateDonationDataEntryInput,
  condition?: ModelDonationDataEntryConditionInput | null,
};

export type UpdateDonationDataEntryMutation = {
  updateDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDonationDataEntryMutationVariables = {
  input: DeleteDonationDataEntryInput,
  condition?: ModelDonationDataEntryConditionInput | null,
};

export type DeleteDonationDataEntryMutation = {
  deleteDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCensusDataEntryMutationVariables = {
  input: CreateCensusDataEntryInput,
  condition?: ModelCensusDataEntryConditionInput | null,
};

export type CreateCensusDataEntryMutation = {
  createCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCensusDataEntryMutationVariables = {
  input: UpdateCensusDataEntryInput,
  condition?: ModelCensusDataEntryConditionInput | null,
};

export type UpdateCensusDataEntryMutation = {
  updateCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCensusDataEntryMutationVariables = {
  input: DeleteCensusDataEntryInput,
  condition?: ModelCensusDataEntryConditionInput | null,
};

export type DeleteCensusDataEntryMutation = {
  deleteCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SimilarSearchQueryVariables = {
  input?: similarSearchInput | null,
};

export type SimilarSearchQuery = {
  similarSearch?:  {
    __typename: "similarSearchOutput",
    FSAs?:  {
      __typename: "SimilarResponseFSAs",
      donation: Array< string >,
      census: Array< string >,
    } | null,
    statusCode?: number | null,
    numResults?: number | null,
  } | null,
};

export type GetDonationDataEntryQueryVariables = {
  id: string,
};

export type GetDonationDataEntryQuery = {
  getDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDonationDataEntriesQueryVariables = {
  filter?: ModelDonationDataEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDonationDataEntriesQuery = {
  listDonationDataEntries?:  {
    __typename: "ModelDonationDataEntryConnection",
    items?:  Array< {
      __typename: "DonationDataEntry",
      id: string,
      FSA: string,
      TYPE: DonationTypeOption,
      YEAR?: number | null,
      NUM_FAM?: number | null,
      TOT_DONS?: number | null,
      NUM_DONS?: number | null,
      MEDIAN_DON?: number | null,
      DON_RATE?: number | null,
      PROVINCE?: ProvinceOption | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCensusDataEntryQueryVariables = {
  id: string,
};

export type GetCensusDataEntryQuery = {
  getCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCensusDataEntriesQueryVariables = {
  filter?: ModelCensusDataEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCensusDataEntriesQuery = {
  listCensusDataEntries?:  {
    __typename: "ModelCensusDataEntryConnection",
    items?:  Array< {
      __typename: "CensusDataEntry",
      id: string,
      FSA: string,
      CID?: number | null,
      TOTAL_COUNT?: number | null,
      MALE_COUNT?: number | null,
      FEMALE_COUNT?: number | null,
      PROVINCE: CensusProvinceOption,
      CATEGORY: string,
      HEADER: string,
      TOTAL_PERCENT?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type DonationDataByTypeFSAQueryVariables = {
  TYPE?: DonationTypeOption | null,
  FSA?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDonationDataEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type DonationDataByTypeFSAQuery = {
  donationDataByTypeFSA?:  {
    __typename: "ModelDonationDataEntryConnection",
    items?:  Array< {
      __typename: "DonationDataEntry",
      id: string,
      FSA: string,
      TYPE: DonationTypeOption,
      YEAR?: number | null,
      NUM_FAM?: number | null,
      TOT_DONS?: number | null,
      NUM_DONS?: number | null,
      MEDIAN_DON?: number | null,
      DON_RATE?: number | null,
      PROVINCE?: ProvinceOption | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type DonationDataByTypeProvinceQueryVariables = {
  PROVINCE?: ProvinceOption | null,
  TYPE?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDonationDataEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type DonationDataByTypeProvinceQuery = {
  donationDataByTypeProvince?:  {
    __typename: "ModelDonationDataEntryConnection",
    items?:  Array< {
      __typename: "DonationDataEntry",
      id: string,
      FSA: string,
      TYPE: DonationTypeOption,
      YEAR?: number | null,
      NUM_FAM?: number | null,
      TOT_DONS?: number | null,
      NUM_DONS?: number | null,
      MEDIAN_DON?: number | null,
      DON_RATE?: number | null,
      PROVINCE?: ProvinceOption | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type CensusDataByCategoryFSAQueryVariables = {
  CID?: number | null,
  FSA?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCensusDataEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CensusDataByCategoryFSAQuery = {
  censusDataByCategoryFSA?:  {
    __typename: "ModelCensusDataEntryConnection",
    items?:  Array< {
      __typename: "CensusDataEntry",
      id: string,
      FSA: string,
      CID?: number | null,
      TOTAL_COUNT?: number | null,
      MALE_COUNT?: number | null,
      FEMALE_COUNT?: number | null,
      PROVINCE: CensusProvinceOption,
      CATEGORY: string,
      HEADER: string,
      TOTAL_PERCENT?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type CensusDataByProvinceCIDQueryVariables = {
  PROVINCE?: CensusProvinceOption | null,
  CID?: ModelFloatKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCensusDataEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CensusDataByProvinceCIDQuery = {
  censusDataByProvinceCID?:  {
    __typename: "ModelCensusDataEntryConnection",
    items?:  Array< {
      __typename: "CensusDataEntry",
      id: string,
      FSA: string,
      CID?: number | null,
      TOTAL_COUNT?: number | null,
      MALE_COUNT?: number | null,
      FEMALE_COUNT?: number | null,
      PROVINCE: CensusProvinceOption,
      CATEGORY: string,
      HEADER: string,
      TOTAL_PERCENT?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateDonationDataEntrySubscription = {
  onCreateDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDonationDataEntrySubscription = {
  onUpdateDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDonationDataEntrySubscription = {
  onDeleteDonationDataEntry?:  {
    __typename: "DonationDataEntry",
    id: string,
    FSA: string,
    TYPE: DonationTypeOption,
    YEAR?: number | null,
    NUM_FAM?: number | null,
    TOT_DONS?: number | null,
    NUM_DONS?: number | null,
    MEDIAN_DON?: number | null,
    DON_RATE?: number | null,
    PROVINCE?: ProvinceOption | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCensusDataEntrySubscription = {
  onCreateCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCensusDataEntrySubscription = {
  onUpdateCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCensusDataEntrySubscription = {
  onDeleteCensusDataEntry?:  {
    __typename: "CensusDataEntry",
    id: string,
    FSA: string,
    CID?: number | null,
    TOTAL_COUNT?: number | null,
    MALE_COUNT?: number | null,
    FEMALE_COUNT?: number | null,
    PROVINCE: CensusProvinceOption,
    CATEGORY: string,
    HEADER: string,
    TOTAL_PERCENT?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
