import { NumericalDonationKey, SelectedCategoryOption } from "@types";
import * as d3 from "d3";
const getFormatFunction = (
  numericalKey: NumericalDonationKey,
  category: SelectedCategoryOption
) => {
  if (category === SelectedCategoryOption.CENSUS) {
    return d3.format("~s");
  }
  switch (numericalKey) {
    case NumericalDonationKey.MEDIAN_DON:
    case NumericalDonationKey.TOT_DONS:
      return d3.format("$~s");
    case NumericalDonationKey.NUM_DONS:
    case NumericalDonationKey.NUM_FAM:
      return d3.format("~s");
    case NumericalDonationKey.DON_RATE:
      return d3.format("~p");
    default:
      return d3.format("~s");
  }
};

export default getFormatFunction;
