import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { getAllFSAData as getAllQuery } from "../../graphql/custom";
import { GetAllFSADataQuery, GetAllFSADataQueryVariables } from "API";

const getAllFSAData = async (input: GetAllFSADataQueryVariables) => {
  const res = (await API.graphql({
    query: getAllQuery,
    variables: input,
  })) as GraphQLResult<GetAllFSADataQuery>;

  if (res.errors?.length) {
    throw new Error("Failed to download data.");
  }
  let retData = {
    census: res.data?.censusDataByFSA?.items,
    donations: res.data?.donationDataByFSA?.items,
  };
  return retData;
};

export default getAllFSAData;
