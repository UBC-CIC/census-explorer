/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const similarSearch = /* GraphQL */ `
  query SimilarSearch($user: similarSearchInput) {
    similarSearch(user: $user) {
      FSAs
    }
  }
`;
export const getDonationData = /* GraphQL */ `
  query GetDonationData($id: ID!) {
    getDonationData(id: $id) {
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
export const listDonationData = /* GraphQL */ `
  query ListDonationData(
    $filter: ModelDonationDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDonationData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const donationDataByType = /* GraphQL */ `
  query DonationDataByType(
    $FSA: String
    $Type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDonationDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    donationDataByType(
      FSA: $FSA
      Type: $Type
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
