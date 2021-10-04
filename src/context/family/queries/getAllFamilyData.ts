import { GraphQLResult } from "@aws-amplify/api-graphql";
import { FSAToFamily } from "@types";
import { DonationDataByTypeFSAQuery, DonationTypeOption } from "../../../API";
import { API } from "aws-amplify";
import { getAllFamilyDataQ } from "../../../graphql/custom";

const getAllFamilyData = async () => {
  // Multiple queries for getting different types of family data
  const options = [
    DonationTypeOption.COUPLE_WITHOUT_CHILDREN,
    DonationTypeOption.COUPLE_WITH_CHILDREN,
    DonationTypeOption.LONE_PARENT_FAMILIES,
    DonationTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES,
  ];

  const promises = options.map(
    (TYPE) =>
      API.graphql({
        query: getAllFamilyDataQ,
        variables: {
          TYPE,
        },
      }) as Promise<GraphQLResult<DonationDataByTypeFSAQuery>>
  );

  const responses = await Promise.all(promises);

  responses.forEach((element) => {
    if (!element.data) throw new Error("Failed to get family Data");
    if (!element.data!.donationDataByTypeFSA!.items)
      throw new Error("Failed to get family Data");
  });

  const familyData: FSAToFamily = {};
  responses.forEach((response) => {
    // Populate familyData with FSA -> "COUPLE_WITH_CHILDREN" -> data
    const items = response.data!.donationDataByTypeFSA!.items!;
    items.forEach((item) => {
      if (!item) return;
      const currFSA = item.FSA as keyof FSAToFamily;
      // @ts-ignore
      familyData[currFSA] = {
        ...familyData[currFSA],
        [item.TYPE]: item,
      };
    });
  });

  return familyData;
};

export default getAllFamilyData;
