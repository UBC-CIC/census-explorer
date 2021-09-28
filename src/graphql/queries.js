/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const similarSearch = /* GraphQL */ `
  query SimilarSearch($user: similarSearchInput) {
    similarSearch(user: $user) {
      FSAs
    }
  }
`;
export const getDonationDataEntry = /* GraphQL */ `
  query GetDonationDataEntry($id: ID!) {
    getDonationDataEntry(id: $id) {
      id
      FSA
      TYPE
      YEAR
      INCOME_GROUP
      NUM_FAM
      TOT_DONS
      NUM_DONS
      MEDIAN_DON
      DON_RATE
      PROVINCE
      createdAt
      updatedAt
    }
  }
`;
export const listDonationDataEntries = /* GraphQL */ `
  query ListDonationDataEntries(
    $filter: ModelDonationDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonationDataEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        TYPE
        YEAR
        INCOME_GROUP
        NUM_FAM
        TOT_DONS
        NUM_DONS
        MEDIAN_DON
        DON_RATE
        PROVINCE
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCensusDataEntry = /* GraphQL */ `
  query GetCensusDataEntry($id: ID!) {
    getCensusDataEntry(id: $id) {
      id
      FSA
      CID
      TOTAL_COUNT
      MALE_COUNT
      FEMALE_COUNT
      PROVINCE
      CATEGORY
      HEADER
      TOTAL_PERCENT
      createdAt
      updatedAt
    }
  }
`;
export const listCensusDataEntries = /* GraphQL */ `
  query ListCensusDataEntries(
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCensusDataEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        CID
        TOTAL_COUNT
        MALE_COUNT
        FEMALE_COUNT
        PROVINCE
        CATEGORY
        HEADER
        TOTAL_PERCENT
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const donationDataByTypeFSA = /* GraphQL */ `
  query DonationDataByTypeFSA(
    $TYPE: DonationTypeOption
    $FSA: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDonationDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    donationDataByTypeFSA(
      TYPE: $TYPE
      FSA: $FSA
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        TYPE
        YEAR
        INCOME_GROUP
        NUM_FAM
        TOT_DONS
        NUM_DONS
        MEDIAN_DON
        DON_RATE
        PROVINCE
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const donationDataByTypeProvince = /* GraphQL */ `
  query DonationDataByTypeProvince(
    $PROVINCE: ProvinceOption
    $TYPE: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDonationDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    donationDataByTypeProvince(
      PROVINCE: $PROVINCE
      TYPE: $TYPE
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        TYPE
        YEAR
        INCOME_GROUP
        NUM_FAM
        TOT_DONS
        NUM_DONS
        MEDIAN_DON
        DON_RATE
        PROVINCE
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const censusDataByCategoryFSA = /* GraphQL */ `
  query CensusDataByCategoryFSA(
    $CATEGORY: String
    $FSA: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    censusDataByCategoryFSA(
      CATEGORY: $CATEGORY
      FSA: $FSA
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        CID
        TOTAL_COUNT
        MALE_COUNT
        FEMALE_COUNT
        PROVINCE
        CATEGORY
        HEADER
        TOTAL_PERCENT
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const censusDataByProvinceCategoryHeader = /* GraphQL */ `
  query CensusDataByProvinceCategoryHeader(
    $PROVINCE: CensusProvinceOption
    $cATEGORYHEADER: ModelCensusDataEntryCensusDataByProvinceCategoryHeaderCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    censusDataByProvinceCategoryHeader(
      PROVINCE: $PROVINCE
      cATEGORYHEADER: $cATEGORYHEADER
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        CID
        TOTAL_COUNT
        MALE_COUNT
        FEMALE_COUNT
        PROVINCE
        CATEGORY
        HEADER
        TOTAL_PERCENT
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
