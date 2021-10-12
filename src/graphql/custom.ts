export const getAllHeadersCategories = /* GraphQL */ `
  query getAllHeadersCategories {
    censusDataByProvinceCID(PROVINCE: CAN, limit: 10000) {
      nextToken
      items {
        CID
        HEADER
        CATEGORY
      }
    }
  }
`;

export const getCensusDataByProvinceCID = /* GraphQL */ `
  query getCensusDataByProvinceCID(
    $PROVINCE: CensusProvinceOption
    $CID: ModelFloatKeyConditionInput
  ) {
    censusDataByProvinceCID(PROVINCE: $PROVINCE, CID: $CID, limit: 10000) {
      items {
        CID
        TOTAL_COUNT
        TOTAL_PERCENT
        FSA
      }
    }
  }
`;

export const getAllFamilyDataQ = /* GraphQL */ `
  query getAllFamilyDataQ(
    $TYPE: DonationTypeOption
    $FSA: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDonationDataEntryFilterInput
  ) {
    donationDataByTypeFSA(
      TYPE: $TYPE
      FSA: $FSA
      sortDirection: $sortDirection
      filter: $filter
      limit: 10000
    ) {
      items {
        FSA
        TYPE
        NUM_FAM
        TOT_DONS
        NUM_DONS
        MEDIAN_DON
        DON_RATE
        PROVINCE
      }
    }
  }
`;

export const getAllFSAData = /* GraphQL */ `
  query GetAllFSAData($FSA: String) {
    censusDataByFSA(FSA: $FSA) {
      items {
        CID
        CATEGORY
        FEMALE_COUNT
        FSA
        HEADER
        MALE_COUNT
        PROVINCE
        TOTAL_COUNT
        TOTAL_PERCENT
      }
    }
    donationDataByFSA(FSA: $FSA) {
      items {
        MEDIAN_DON
        FSA
        DON_RATE
        NUM_DONS
        NUM_FAM
        PROVINCE
        TOT_DONS
        TYPE
        YEAR
      }
    }
  }
`;
