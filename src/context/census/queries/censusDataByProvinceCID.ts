import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CensusProvinceOption, getCensusDataByProvinceCIDQuery } from "API";
import { API } from "aws-amplify";
import { getCensusDataByProvinceCID } from "../../../graphql/custom";
// import { censusDataByProvinceCID } from "../../../graphql/queries";

const getCensusData = async (province: CensusProvinceOption, CID: Number) => {
  const res = (await API.graphql({
    query: getCensusDataByProvinceCID,
    variables: {
      PROVINCE: province,
      CID: { eq: CID },
    },
  })) as GraphQLResult<getCensusDataByProvinceCIDQuery>;
  if (!res.data) throw new Error("Failed to get census Data");
  return res.data!.censusDataByProvinceCID!.items;
};

export default getCensusData;
