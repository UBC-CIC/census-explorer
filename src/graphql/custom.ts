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
