import { GraphQLResult } from "@aws-amplify/api-graphql";
import { FSAToFamily, FSAType } from "@types";
import { similarSearchInput, SimilarSearchQuery } from "../../API";
import { API } from "aws-amplify";
import { similarSearch } from "../../graphql/queries";

const callSimilarLambda = async (input: similarSearchInput) => {
  const res = (await API.graphql({
    query: similarSearch,
    variables: {
      input,
    },
  })) as GraphQLResult<SimilarSearchQuery>;
  if (!res.data) console.log("there was an error getting similar fsas");

  return res.data?.similarSearch?.FSAs;
};

export default callSimilarLambda;
