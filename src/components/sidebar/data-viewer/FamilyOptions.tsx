import SelectedFamilyTypeContext from "@context/SelectedFamilyTypeProvider";
import useSelectedData from "@hooks/appstate/useSelectedData";
import { Button, ButtonGroup, Collapse, makeStyles } from "@material-ui/core";
import { selectorStyles } from "@styles";
import {
  FamilyTypeOption,
  NumericalFamilyKey,
  SelectedDataOption,
} from "@types";
import strings from "@l10n/strings";
import { useContext } from "react";

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
  numericalOptionGroup: {
    flexDirection: "row",
    display: "flex",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTop: 0,
    justifyContent: "space-evenly",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  numericalOption: {
    flex: 1,
    fontSize: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
}));

const FamilyOptions = () => {
  const classes = useStyles();
  const {
    selectedFamilyType,
    selectedNumericalType,
    setSelectedFamilyType,
    setSelectedNumericalType,
  } = useContext(SelectedFamilyTypeContext);
  console.log(selectedFamilyType);

  const [, selectedOption] = useSelectedData();
  const active = selectedOption === SelectedDataOption.FAMILY;
  return (
    <Collapse in={active}>
      <div className={selectorStyles.familyOptions}>
        <ButtonGroup
          color="primary"
          variant="text"
          className={classes.numericalOptionGroup}
        >
          <Button
            variant={
              selectedNumericalType === NumericalFamilyKey.TotDons
                ? "contained"
                : "text"
            }
            onClick={() => setSelectedNumericalType(NumericalFamilyKey.TotDons)}
            className={classes.numericalOption}
          >
            Donation Totals ($)
          </Button>
          <Button
            variant={
              selectedNumericalType === NumericalFamilyKey.NumDons
                ? "contained"
                : "text"
            }
            onClick={() => setSelectedNumericalType(NumericalFamilyKey.NumDons)}
            className={classes.numericalOption}
          >
            Number of Donations
          </Button>
          <Button
            variant={
              selectedNumericalType === NumericalFamilyKey.DonRate
                ? "contained"
                : "text"
            }
            onClick={() => setSelectedNumericalType(NumericalFamilyKey.DonRate)}
            className={classes.numericalOption}
          >
            Donation Rate
          </Button>
          <Button
            variant={
              selectedNumericalType === NumericalFamilyKey.MedianDon
                ? "contained"
                : "text"
            }
            onClick={() =>
              setSelectedNumericalType(NumericalFamilyKey.MedianDon)
            }
            className={classes.numericalOption}
          >
            Median Donation
          </Button>
          <Button
            variant={
              selectedNumericalType === NumericalFamilyKey.NumFam
                ? "contained"
                : "text"
            }
            onClick={() => setSelectedNumericalType(NumericalFamilyKey.NumFam)}
            className={classes.numericalOption}
          >
            Number of Families
          </Button>
        </ButtonGroup>
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
