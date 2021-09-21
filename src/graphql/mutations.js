/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDonationData = /* GraphQL */ `
  mutation CreateDonationData(
    $input: CreateDonationDataInput!
    $condition: ModelDonationDataConditionInput
  ) {
    createDonationData(input: $input, condition: $condition) {
      id
      FSA
      Type
      Year
      IncomeGroup
      NumFam
      TotDons
      NumDons
      MedianDon
      DonRate
      createdAt
      updatedAt
    }
  }
`;
export const updateDonationData = /* GraphQL */ `
  mutation UpdateDonationData(
    $input: UpdateDonationDataInput!
    $condition: ModelDonationDataConditionInput
  ) {
    updateDonationData(input: $input, condition: $condition) {
      id
      FSA
      Type
      Year
      IncomeGroup
      NumFam
      TotDons
      NumDons
      MedianDon
      DonRate
      createdAt
      updatedAt
    }
  }
`;
export const deleteDonationData = /* GraphQL */ `
  mutation DeleteDonationData(
    $input: DeleteDonationDataInput!
    $condition: ModelDonationDataConditionInput
  ) {
    deleteDonationData(input: $input, condition: $condition) {
      id
      FSA
      Type
      Year
      IncomeGroup
      NumFam
      TotDons
      NumDons
      MedianDon
      DonRate
      createdAt
      updatedAt
    }
  }
`;
