import { NumericalDonationKey } from "@types";
import * as d3 from "d3";
const getFormatFunction = (numericalKey: NumericalDonationKey) => {
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
      throw new Error("getFormatFunction: invalid numericalKey");
  }
};

export default getFormatFunction;
