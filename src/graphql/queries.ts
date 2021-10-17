/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const similarSearch = /* GraphQL */ `
  query SimilarSearch($input: similarSearchInput) {
    similarSearch(input: $input) {
      FSAs {
        donation
        census
      }
      statusCode
      numResults
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
export const listDonationDataEntrys = /* GraphQL */ `
  query ListDonationDataEntrys(
    $filter: ModelDonationDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonationDataEntrys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FSA
        TYPE
        YEAR
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
export const listCensusDataEntrys = /* GraphQL */ `
  query ListCensusDataEntrys(
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCensusDataEntrys(
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
export const donationDataByTypeFsa = /* GraphQL */ `
  query DonationDataByTypeFsa(
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
export const donationDataByFsa = /* GraphQL */ `
  query DonationDataByFsa(
    $FSA: String
    $sortDirection: ModelSortDirection
    $filter: ModelDonationDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    donationDataByFSA(
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
export const censusDataByCategoryFsa = /* GraphQL */ `
  query CensusDataByCategoryFsa(
    $CID: Float
    $FSA: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    censusDataByCategoryFSA(
      CID: $CID
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
export const censusDataByFsa = /* GraphQL */ `
  query CensusDataByFsa(
    $FSA: String
    $sortDirection: ModelSortDirection
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    censusDataByFSA(
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
export const censusDataByProvinceCid = /* GraphQL */ `
  query CensusDataByProvinceCid(
    $PROVINCE: CensusProvinceOption
    $CID: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCensusDataEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    censusDataByProvinceCID(
      PROVINCE: $PROVINCE
      CID: $CID
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
