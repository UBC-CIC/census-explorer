import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import CensusDataContext from "@context/census/CensusDataProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { MainCategoryInfoStrings, NumericalInfoStrings } from "@l10n/strings";
import { sidebarStyles } from "@styles";
import { SelectedCategoryOption } from "@types";
import { useContext } from "react";

type InfoSectionProps = {};

const InfoSection = (props: InfoSectionProps) => {
  const selectedCategory = useSelectedCategory();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);

  if (selectedCategory === SelectedCategoryOption.CENSUS) return null;
  const main = MainCategoryInfoStrings[selectedCategory] as any;
  const sub = NumericalInfoStrings[selectedNumericalType];
  return (
    <div className={sidebarStyles.infoContainer}>
      <div className={sidebarStyles.infoMain}>{main}</div>
      <div className={sidebarStyles.infoSub}>{sub}</div>
    </div>
  );
};

export default InfoSection;
