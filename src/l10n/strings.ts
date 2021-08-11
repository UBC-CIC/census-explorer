import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    hide: "Hide",
    show: "Show",
    allProvinces: "All Provinces",
    coupleWithChildren: "Couple With Children",
    loneParentFamilies: "Lone-parent Families",
    coupleWithoutChildren: "Couple Without Children",
    personsNotInCensusFamilies: "Persons Not in Census Families",
    familyData: "Family Data",
    censusData: "Census Data",
    incomeData: "Income Data",
    l20K: "<$20K",
    l40K: "$20K < $40K",
    l60K: "$40K < $60K",
    l80K: "$60K < $80K",
    l100K: "$80K < $100K",
    l150K: "$100K < $150K",
    l200K: "$150K < $200K",
    l250K: " $200K < $250K",
    ge250K: ">= $250K",
    toggleToMap: "Select Provinces as Map",
    toggleToCheckbox: "Select Provinces as List",
    deviation: "Standard Deviations",
    zoom: "Zoom",
  },
});

const LongProvinceNames = new LocalizedStrings({
  en: {
    ab: "Alberta",
    bc: "British Columbia",
    mb: "Manitoba",
    nb: "New Brunswick",
    nl: "Newfoundland and Labrador",
    ns: "Nova Scotia",
    nt: "Northwest Territories",
    nu: "Nunavut",
    on: "Ontario",
    pe: "Prince Edward Island",
    qc: "Quebec",
    sk: "Saskatchewan",
    yt: "Yukon",
  },
});

const MainCategoryInfoStrings = new LocalizedStrings<any>({
  en: {
    FAMILY: "Visualizing by Family Type",
    INCOME: "Visualizing by Income Group",
    CENSUS: "Visualizing by Census Information",
  },
});

const NumericalInfoStrings = new LocalizedStrings<any>({
  en: {
    TotDons: "Donation Totals: Total Dollars Donated per FSA",
    NumFam: "Number of Families: Number of families per FSA",
    NumDons: "Number of Donations: Total Number of Donations per FSA",
    MedianDon:
      "Median Donation: Average Dollars per Donation per Family per FSA",
    DonRate: "Donation Rate: % of Families that Donated per FSA",
  },
});

export { LongProvinceNames, MainCategoryInfoStrings, NumericalInfoStrings };

export default strings;
