import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import strings from "@l10n/strings";
import { Button, ButtonGroup, Collapse, makeStyles } from "@material-ui/core";
import { selectorStyles } from "@styles";
import { FamilyTypeOption, SelectedCategoryOption } from "@types";
import { useContext } from "react";
import DonationOptions from "./DonationOptions";

type FamilyOptionsProps = {};

const useStyles = makeStyles((theme) => ({
  familyOption: {
    fontSize: 10,
  },
  familyOptionGroup: {
    border: `1px solid ${theme.palette.secondary.main}`,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const FamilyOptions = () => {
  const classes = useStyles();
  const { selectedFamilyType, setSelectedFamilyType } = useContext(
    SelectedFamilyTypeContext
  );
  const loading = useFamilyDataLoading();
  const selectedCategory = useSelectedCategory();
  const active = !loading && selectedCategory === SelectedCategoryOption.FAMILY;
  return (
    <Collapse in={active}>
      <div className={selectorStyles.familyOptions}>
        <DonationOptions />
        <ButtonGroup
          orientation="vertical"
          variant="text"
          color="secondary"
          className={classes.familyOptionGroup}
        >
          <Button
            variant={
              selectedFamilyType === FamilyTypeOption.COUPLE_WITH_CHILDREN
                ? "contained"
                : "text"
            }
            color="secondary"
            className={classes.familyOption}
            onClick={() =>
              setSelectedFamilyType(FamilyTypeOption.COUPLE_WITH_CHILDREN)
            }
          >
            {strings.coupleWithChildren}
          </Button>
          <Button
            color="secondary"
            variant={
              selectedFamilyType === FamilyTypeOption.LONE_PARENT_FAMILIES
                ? "contained"
                : "text"
            }
            className={classes.familyOption}
            onClick={() =>
              setSelectedFamilyType(FamilyTypeOption.LONE_PARENT_FAMILIES)
            }
          >
            {strings.loneParentFamilies}
          </Button>
          <Button
            color="secondary"
            variant={
              selectedFamilyType === FamilyTypeOption.COUPLE_WITHOUT_CHILDREN
                ? "contained"
                : "text"
            }
            className={classes.familyOption}
            onClick={() =>
              setSelectedFamilyType(FamilyTypeOption.COUPLE_WITHOUT_CHILDREN)
            }
          >
            {strings.coupleWithoutChildren}
          </Button>
          <Button
            color="secondary"
            variant={
              selectedFamilyType ===
              FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES
                ? "contained"
                : "text"
            }
            className={classes.familyOption}
            onClick={() =>
              setSelectedFamilyType(
                FamilyTypeOption.PERSONS_NOT_IN_CENSUS_FAMILIES
              )
            }
          >
            {strings.personsNotInCensusFamilies}
          </Button>
        </ButtonGroup>
      </div>
    </Collapse>
  );
};

export default FamilyOptions;
