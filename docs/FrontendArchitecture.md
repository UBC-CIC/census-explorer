# Architecture

Using AWS Amplify, this project has the following configured backend resources:

- 2 [DynamoDB](https://aws.amazon.com/dynamodb/) tables
  1. Save user attributes from external IDP provider (For future development)
  2. Save user survey responses to provide best recommendation onto their feeds
- A [GraphQL API](https://docs.amplify.aws/guides/api-graphql/building-a-form-api/q/platform/js) that allows the app to query data from the above 3 tables
- An [S3 Bucket](https://aws.amazon.com/s3/) for storing the [GeoJSON](https://geojson.org/) data used in the heatmap
- A [Lambda Function](https://aws.amazon.com/lambda/) for searching for similarities between FSAs

<hr>

## GraphQL Schema

### Census Data Table

```
enum CensusProvinceOption {
  CAN
  AB
  BC
  MB
  NB
  NL
  NS
  NT
  NU
  ON
  PE
  QC
  SK
  YT
}
type CensusDataEntry
  @model
  @aws_api_key
  @key(
    name: "censusDataByCategoryFSA"
    fields: ["CID", "FSA"]
    queryField: "censusDataByCategoryFSA"
  )
  @key(name: "censusDataByFSA", fields: ["FSA"], queryField: "censusDataByFSA")
  @key(
    name: "censusDataByProvinceCID"
    fields: ["PROVINCE", "CID"]
    queryField: "censusDataByProvinceCID"
  ) {
  FSA: String!
  CID: Float
  TOTAL_COUNT: Float
  MALE_COUNT: Float
  FEMALE_COUNT: Float
  PROVINCE: CensusProvinceOption!
  CATEGORY: String!
  HEADER: String!
  TOTAL_PERCENT: Float
}
```

### Donation Data Table

```
enum ProvinceOption {
  AB
  BC
  MB
  NB
  NL
  NS
  NT
  NU
  ON
  PE
  QC
  SK
  YT
}
enum DonationTypeOption {
  COUPLE_WITH_CHILDREN
  LONE_PARENT_FAMILIES
  COUPLE_WITHOUT_CHILDREN
  PERSONS_NOT_IN_CENSUS_FAMILIES
  l20K
  l40K
  l60K
  l80K
  l100K
  l150K
  l200K
  l250K
  ge250K
}
type DonationDataEntry
  @model
  @aws_api_key
  @key(
    name: "donationDataByTypeFSA"
    fields: ["TYPE", "FSA"]
    queryField: "donationDataByTypeFSA"
  )
  @key(
    name: "donationDataByFSA"
    fields: ["FSA"]
    queryField: "donationDataByFSA"
  )
  @key(
    name: "donationDataByTypeProvince"
    fields: ["PROVINCE", "TYPE"]
    queryField: "donationDataByTypeProvince"
  ) {
  FSA: String!
  TYPE: DonationTypeOption!
  YEAR: Float
  NUM_FAM: Float
  TOT_DONS: Float
  NUM_DONS: Float
  MEDIAN_DON: Float
  DON_RATE: Float
  PROVINCE: ProvinceOption
}
```
