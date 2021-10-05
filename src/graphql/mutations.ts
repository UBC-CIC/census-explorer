/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDonationDataEntry = /* GraphQL */ `
  mutation CreateDonationDataEntry(
    $input: CreateDonationDataEntryInput!
    $condition: ModelDonationDataEntryConditionInput
  ) {
    createDonationDataEntry(input: $input, condition: $condition) {
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
export const updateDonationDataEntry = /* GraphQL */ `
  mutation UpdateDonationDataEntry(
    $input: UpdateDonationDataEntryInput!
    $condition: ModelDonationDataEntryConditionInput
  ) {
    updateDonationDataEntry(input: $input, condition: $condition) {
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
export const deleteDonationDataEntry = /* GraphQL */ `
  mutation DeleteDonationDataEntry(
    $input: DeleteDonationDataEntryInput!
    $condition: ModelDonationDataEntryConditionInput
  ) {
    deleteDonationDataEntry(input: $input, condition: $condition) {
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
export const createCensusDataEntry = /* GraphQL */ `
  mutation CreateCensusDataEntry(
    $input: CreateCensusDataEntryInput!
    $condition: ModelCensusDataEntryConditionInput
  ) {
    createCensusDataEntry(input: $input, condition: $condition) {
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
export const updateCensusDataEntry = /* GraphQL */ `
  mutation UpdateCensusDataEntry(
    $input: UpdateCensusDataEntryInput!
    $condition: ModelCensusDataEntryConditionInput
  ) {
    updateCensusDataEntry(input: $input, condition: $condition) {
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
export const deleteCensusDataEntry = /* GraphQL */ `
  mutation DeleteCensusDataEntry(
    $input: DeleteCensusDataEntryInput!
    $condition: ModelCensusDataEntryConditionInput
  ) {
    deleteCensusDataEntry(input: $input, condition: $condition) {
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
