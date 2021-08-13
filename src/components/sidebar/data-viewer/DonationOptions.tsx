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
    border: `1px solid ${theme.palette.primary.main}`,
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
      color="primary"
      variant="text"
      className={classes.numericalOptionGroup}
    >
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.TotDons
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.TotDons)}
        className={classes.numericalOption}
      >
        Donation Totals ($)
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.NumDons
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.NumDons)}
        className={classes.numericalOption}
      >
        Number of Donations
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.DonRate
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.DonRate)}
        className={classes.numericalOption}
      >
        Donation Rate
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.MedianDon
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.MedianDon)}
        className={classes.numericalOption}
      >
        Median Donation
      </Button>
      <Button
        variant={
          selectedNumericalType === NumericalDonationKey.NumFam
            ? "contained"
            : "text"
        }
        onClick={() => setSelectedNumericalType(NumericalDonationKey.NumFam)}
        className={classes.numericalOption}
      >
        Number of Families
      </Button>
    </ButtonGroup>
  );
};

export default DonationOptions;
