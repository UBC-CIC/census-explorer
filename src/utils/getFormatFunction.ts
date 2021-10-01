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
    case NumericalDonationKey.MedianDon:
    case NumericalDonationKey.TotDons:
      return d3.format("$~s");
    case NumericalDonationKey.NumDons:
    case NumericalDonationKey.NumFam:
      return d3.format("~s");
    case NumericalDonationKey.DonRate:
      return d3.format("~p");
    default:
      return d3.format("~s");
  }
};

export default getFormatFunction;
