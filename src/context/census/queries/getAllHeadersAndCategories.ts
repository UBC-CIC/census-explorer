import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CIDandCategory } from "@types";
import { CensusProvinceOption, getAllHeadersCategoriesQuery } from "API";
import { API } from "aws-amplify";
import { getAllHeadersCategories } from "../../../graphql/custom";

const getHeadersAndCategories = async () => {
  const res = (await API.graphql({
    query: getAllHeadersCategories,
    authMode: "API_KEY",
  })) as GraphQLResult<getAllHeadersCategoriesQuery>;
  if (!res.data) throw new Error("Failed to get census data");
  const headers = new Map<string, CIDandCategory[]>();
  res.data.censusDataByProvinceCID?.items?.forEach((item) => {
    if (!item) return;
    if (!headers.has(item.HEADER)) headers.set(item.HEADER, []);
  });

  res.data.censusDataByProvinceCID?.items?.forEach((item) => {
    if (!item) return;
    headers.get(item.HEADER)?.push({ CID: item.CID!, category: item.CATEGORY });
  });

  return headers;
};

export default getHeadersAndCategories;
