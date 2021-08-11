import Spinner from "@components/Spinner";
import SelectedDataContext from "@context/appstate/SelectedDataProvider";
import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
import strings from "@l10n/strings";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { SelectedDataOption } from "@types";
import { useContext } from "react";
import FamilyOptions from "./FamilyOptions";
import IncomeOptions from "./IncomeOptions";

const useStyles = makeStyles({
  familyButton: {},
});
const DataSelector = () => {
  const classes = useStyles();
  const censusLoading = useCensusDataLoading();
  const incomeLoading = useIncomeDataLoading();
  const familyLoading = useFamilyDataLoading();
  const { selected, setSelected } = useContext(SelectedDataContext);
  const handleSelectOption = (option: SelectedDataOption) => {
    setSelected(option);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flexBasis: 350 }}>
      <ButtonGroup orientation="vertical">
        <Button
          variant={
            selected === SelectedDataOption.FAMILY ? "contained" : "outlined"
          }
          className={classes.familyButton}
          color="primary"
          onClick={() => handleSelectOption(SelectedDataOption.FAMILY)}
          disabled={familyLoading}
          endIcon={familyLoading ? <Spinner /> : null}
        >
          {strings.familyData}
        </Button>
        <FamilyOptions />
        <Button
          variant={
            selected === SelectedDataOption.INCOME ? "contained" : "outlined"
          }
          color="primary"
          onClick={() => handleSelectOption(SelectedDataOption.INCOME)}
          disabled={incomeLoading}
          endIcon={incomeLoading ? <Spinner /> : null}
        >
          {strings.incomeData}
        </Button>
        <IncomeOptions />
        <Button
          variant={
            selected === SelectedDataOption.CENSUS ? "contained" : "outlined"
          }
          disabled={censusLoading}
          endIcon={censusLoading ? <Spinner /> : null}
          color="primary"
          onClick={() => handleSelectOption(SelectedDataOption.CENSUS)}
        >
          {strings.censusData}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default DataSelector;
