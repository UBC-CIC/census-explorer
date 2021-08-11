import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useSelectedData from "@hooks/appstate/useSelectedData";
import { MainCategoryInfoStrings, NumericalInfoStrings } from "@l10n/strings";
import { sidebarStyles } from "@styles";
import { SelectedDataOption, SelectedInfoOptions } from "@types";
import { useContext, useState } from "react";

type InfoSectionProps = {};

const InfoSection = (props: InfoSectionProps) => {
  const [, selectedType] = useSelectedData();
  const { selectedFamilyType, selectedNumericalType } = useContext(
    SelectedFamilyTypeContext
  );
  const { selectedIncomeType } = useContext(SelectedIncomeTypeContext);

  let selectedSubOption;
  if (selectedType === SelectedDataOption.FAMILY) {
    selectedSubOption = selectedFamilyType;
  } else if (selectedType === SelectedDataOption.INCOME) {
    selectedSubOption = selectedIncomeType;
  } else {
    // selectedSubOption = selectedNumericalType;
    selectedSubOption = selectedIncomeType;
    // TODO census type
  }

  const main = MainCategoryInfoStrings[
    selectedType as SelectedDataOption
  ] as any;
  const sub = NumericalInfoStrings[selectedNumericalType];
  return (
    <div className={sidebarStyles.infoContainer}>
      <div className={sidebarStyles.infoMain}>{main}</div>
      <div className={sidebarStyles.infoSub}>{sub}</div>
    </div>
  );
};

export default InfoSection;
