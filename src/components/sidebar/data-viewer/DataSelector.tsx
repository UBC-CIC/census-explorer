import SelectedDataContext from "@context/SelectedDataProvider";
import strings from "@l10n/strings";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { SelectedDataOption } from "@types";
import { useContext } from "react";
import FamilyOptions from "./FamilyOptions";

const useStyles = makeStyles({
  familyButton: {
    // borderBottomRightRadius: 0,
    // borderBottomLeftRadius: 0,
  },
});
const DataSelector = () => {
  const classes = useStyles();
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
        >
          {strings.familyData}
        </Button>
        <FamilyOptions />
        <Button
          variant={
            selected === SelectedDataOption.CENSUS ? "contained" : "outlined"
          }
          color="primary"
          onClick={() => handleSelectOption(SelectedDataOption.CENSUS)}
        >
          {strings.censusData}
        </Button>
        <Button
          variant={
            selected === SelectedDataOption.INCOME ? "contained" : "outlined"
          }
          color="primary"
          onClick={() => handleSelectOption(SelectedDataOption.INCOME)}
        >
          {strings.incomeData}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default DataSelector;
