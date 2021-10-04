import { GraphQLResult } from "@aws-amplify/api-graphql";
import { FSAToFamily, FSAType } from "@types";
import {
  DonationDataByTypeFSAQuery,
  DonationTypeOption,
  similarSearchInput,
} from "../../API";
import { API } from "aws-amplify";
import { getAllFamilyDataQ } from "../../graphql/custom";
import { similarSearch } from "graphql/queries";

const callSimilarLambda = async (input: similarSearchInput) => {
  const res = API.graphql({
    query: similarSearch,
    variables: {
      input,
    },
  }) as Promise<GraphQLResult<DonationDataByTypeFSAQuery>>;
};

export default callSimilarLambda;
