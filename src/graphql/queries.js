/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const similarSearch = /* GraphQL */ `
  query SimilarSearch($user: similarSearchInput) {
    similarSearch(user: $user) {
      FSAs
    }
  }
`;
export const getFamilyData = /* GraphQL */ `
  query GetFamilyData($id: ID!) {
    getFamilyData(id: $id) {
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
export const listFamilyData = /* GraphQL */ `
  query ListFamilyData(
    $filter: ModelFamilyDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFamilyData(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getIncomeData = /* GraphQL */ `
  query GetIncomeData($id: ID!) {
    getIncomeData(id: $id) {
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
export const listIncomeData = /* GraphQL */ `
  query ListIncomeData(
    $filter: ModelIncomeDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIncomeData(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const familyDataByType = /* GraphQL */ `
  query FamilyDataByType(
    $FSA: String
    $Type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFamilyDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    familyDataByType(
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
export const incomeDataByType = /* GraphQL */ `
  query IncomeDataByType(
    $FSA: String
    $Type: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelIncomeDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    incomeDataByType(
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
