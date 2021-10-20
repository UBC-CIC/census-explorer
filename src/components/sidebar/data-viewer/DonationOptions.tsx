import SelectedFamilyTypeContext from "@context/appstate/SelectedFamilyTypeProvider";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { NumericalDonationKey } from "@types";
import { useContext } from "react";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";

type DonationOptionsProps = {};

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
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  numericalOption: {
    flex: 1,
    fontSize: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
}));

const DonationOptions = (props: DonationOptionsProps) => {
  const { selectedNumericalType, setSelectedNumericalType } = useContext(
    SelectedNumericalContext
  );

  const classes = useStyles();
  return (
    <ButtonGroup
      color="secondary"
      variant="text"
      className={classes.numericalOptionGroup}
    >
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.TOT_DONS
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.TOT_DONS)}
        className={classes.numericalOption}
      >
        Donation Totals ($)
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.NUM_DONS
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.NUM_DONS)}
        className={classes.numericalOption}
      >
        Number of Donations
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.DON_RATE
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.DON_RATE)}
        className={classes.numericalOption}
      >
        Donation Rate
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.MEDIAN_DON
            ? "contained"
            : "text"
        }
        onClick={() =>
          setSelectedNumericalType(NumericalDonationKey.MEDIAN_DON)
        }
        className={classes.numericalOption}
      >
        Median Donation
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.NUM_FAM
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.NUM_FAM)}
        className={classes.numericalOption}
      >
        Number of Families
      </Button>
    </ButtonGroup>
  );
};

export default DonationOptions;
