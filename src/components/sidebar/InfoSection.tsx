import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import { MainCategoryInfoStrings, NumericalInfoStrings } from "@l10n/strings";
import { sidebarStyles } from "@styles";
import { useContext } from "react";

type InfoSectionProps = {};

const InfoSection = (props: InfoSectionProps) => {
  const selectedCategory = useSelectedCategory();
  const { selectedNumericalType } = useContext(SelectedNumericalContext);

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
