import { GraphQLResult } from "@aws-amplify/api-graphql";
import { FSAToFamily, FSAToIncome } from "@types";
import { DonationDataByTypeFSAQuery, DonationTypeOption } from "../../../API";
import { API } from "aws-amplify";
import { getAllFamilyDataQ } from "../../../graphql/custom";

const getAllIncomeData = async () => {
  // Multiple queries for getting different types of family data
  const options = [
    DonationTypeOption.l20K,
    DonationTypeOption.l40K,
    DonationTypeOption.l60K,
    DonationTypeOption.l80K,
    DonationTypeOption.l100K,
    DonationTypeOption.l150K,
    DonationTypeOption.l200K,
    DonationTypeOption.l250K,
    DonationTypeOption.ge250K,
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

  const incomeData: FSAToIncome = {};
  responses.forEach((response) => {
    // Populate familyData with FSA -> "COUPLE_WITH_CHILDREN" -> data
    const items = response.data!.donationDataByTypeFSA!.items!;
    items.forEach((item) => {
      if (!item) return;
      const currFSA = item.FSA as keyof FSAToIncome;
      // @ts-ignore
      incomeData[currFSA] = {
        ...incomeData[currFSA],
        [item.TYPE]: item,
      };
    });
  });

  return incomeData;
};

export default getAllIncomeData;
