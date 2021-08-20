import Spinner from "@components/Spinner";
import SelectedCategoryContext from "@context/appstate/SelectedDataProvider";
import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useFamilyDataLoading from "@hooks/family/useFamilyDataLoading";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
import strings from "@l10n/strings";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { SelectedCategoryOption } from "@types";
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
  const { selected, setSelected } = useContext(SelectedCategoryContext);
  const handleSelectOption = (option: SelectedCategoryOption) => {
    setSelected(option);
  };

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
            selected === SelectedCategoryOption.FAMILY
              ? "contained"
              : "outlined"
          }
          className={classes.familyButton}
          color="primary"
          onClick={() => handleSelectOption(SelectedCategoryOption.FAMILY)}
          disabled={familyLoading}
          endIcon={familyLoading ? <Spinner /> : null}
        >
          {strings.familyData}
        </Button>
        <FamilyOptions />
        <Button
          variant={
            selected === SelectedCategoryOption.INCOME
              ? "contained"
              : "outlined"
          }
          color="primary"
          onClick={() => handleSelectOption(SelectedCategoryOption.INCOME)}
          disabled={incomeLoading}
          endIcon={incomeLoading ? <Spinner /> : null}
        >
          {strings.incomeData}
        </Button>
        <IncomeOptions />
        <Button
          variant={
            selected === SelectedCategoryOption.CENSUS
              ? "contained"
              : "outlined"
          }
          disabled={censusLoading}
          endIcon={censusLoading ? <Spinner /> : null}
          color="primary"
          onClick={() => handleSelectOption(SelectedCategoryOption.CENSUS)}
        >
          {strings.censusData}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default DataSelector;
