import Spinner from "@components/Spinner";
import SelectedCategoryContext from "@context/appstate/SelectedCategoryProvider";
import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
import strings from "@l10n/strings";
import { Button, ButtonGroup, Collapse, makeStyles } from "@material-ui/core";
import { SelectedCategoryOption } from "@types";
import { useContext } from "react";
import CensusOptions from "./CensusOptions";
import DonationOptions from "./DonationOptions";
import FamilyOptions from "./FamilyOptions";
import IncomeOptions from "./IncomeOptions";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  familyButton: {
    width: "50%",
  },
  censusButton: {
    borderBottomWidth: 1,
    borderBottomColor: `${theme.palette.primary.main} !important`,
    // borderBottomRightRadius: 4,
    // borderBottomLeftRadius: 4,
  },
}));
const DataSelector = () => {
  const classes = useStyles();
  const censusLoading = useCensusDataLoading();
  const incomeLoading = useIncomeDataLoading();
  const familyLoading = useFamilyDataLoading();
  const headers = useCensusHeaders();
  const [showDonation, setShowDonation] = useState(true);
  const [prevDonation, setPrevDonation] = useState(
    SelectedCategoryOption.FAMILY
  );
  const { selected, setSelected } = useContext(SelectedCategoryContext);
  const handleSelectOption = (option: SelectedCategoryOption) => {
    if (option === SelectedCategoryOption.CENSUS) {
      setShowDonation(false);
      if (selected !== SelectedCategoryOption.CENSUS) setPrevDonation(selected);
    }
    setSelected(option);
  };

  const handlePressDonation = () => {
    if (showDonation) return;
    setShowDonation(true);
    setSelected(prevDonation);
  };

  const DonationSection = () => (
    <Collapse
      in={
        showDonation ||
        selected === SelectedCategoryOption.FAMILY ||
        selected === SelectedCategoryOption.INCOME
      }
    >
      <Button
        variant={
          selected === SelectedCategoryOption.FAMILY ? "contained" : "outlined"
        }
        className={classes.familyButton}
        color="secondary"
        onClick={() => handleSelectOption(SelectedCategoryOption.FAMILY)}
        disabled={familyLoading}
        endIcon={familyLoading ? <Spinner /> : null}
      >
        {strings.familyData}
      </Button>
      <Button
        variant={
          selected === SelectedCategoryOption.INCOME ? "contained" : "outlined"
        }
        color="secondary"
        className={classes.familyButton}
        onClick={() => handleSelectOption(SelectedCategoryOption.INCOME)}
        disabled={incomeLoading}
        endIcon={incomeLoading ? <Spinner /> : null}
      >
        {strings.incomeData}
      </Button>
      <FamilyOptions />

      <IncomeOptions />
    </Collapse>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexBasis: 350,
        marginBottom: "20px",
      }}
    >
      <ButtonGroup orientation="vertical">
        <Button
          variant={
            showDonation ||
            selected === SelectedCategoryOption.FAMILY ||
            selected === SelectedCategoryOption.INCOME
              ? "contained"
              : "outlined"
          }
          className={classes.censusButton}
          disabled={!headers.size}
          color="primary"
          onClick={handlePressDonation}
        >
          {strings.donationData}
        </Button>
        <DonationSection />
        <Button
          variant={
            selected === SelectedCategoryOption.CENSUS
              ? "contained"
              : "outlined"
          }
          className={classes.censusButton}
          disabled={!headers.size}
          endIcon={censusLoading ? <Spinner /> : null}
          color="primary"
          onClick={() => handleSelectOption(SelectedCategoryOption.CENSUS)}
        >
          {strings.censusData}
        </Button>
        <CensusOptions />
      </ButtonGroup>
    </div>
  );
};

export default DataSelector;
