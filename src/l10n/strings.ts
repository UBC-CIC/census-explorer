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
  },
});

export default strings;
