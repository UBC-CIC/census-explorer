import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import useSelectedData from "@hooks/appstate/useSelectedData";
import useIncomeDataLoading from "@hooks/income/useIncomeDataLoading";
import strings from "@l10n/strings";
import { Button, ButtonGroup, Collapse, makeStyles } from "@material-ui/core";
import { selectorStyles } from "@styles";
import { IncomeTypeOption, SelectedCategoryOption } from "@types";
import { useContext } from "react";
import DonationOptions from "./DonationOptions";

type FamilyOptionsProps = {};

const useStyles = makeStyles((theme) => ({
  incomeOption: {
    fontSize: 10,
  },
  incomeOptionsGroup: {
    border: `1px solid ${theme.palette.secondary.main}`,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const IncomeOptions = () => {
  const classes = useStyles();
  const { selectedIncomeType, setSelectedIncomeType } = useContext(
    SelectedIncomeTypeContext
  );
  const loading = useIncomeDataLoading();
  const selectedCategory = useSelectedCategory();

  const active = !loading && selectedCategory === SelectedCategoryOption.INCOME;
  return (
    <Collapse in={active}>
      <div className={selectorStyles.incomeOptions}>
        <DonationOptions />
        <ButtonGroup
          variant="text"
          color="secondary"
          className={classes.incomeOptionsGroup}
        >
          {Object.entries(IncomeTypeOption).map(([key, option], index) => (
            <Button
              key={option}
              variant={selectedIncomeType === option ? "contained" : "text"}
              color="secondary"
              className={classes.incomeOption}
              onClick={() => setSelectedIncomeType(option)}
            >
              {(strings as any)[key]}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Collapse>
  );
};

export default IncomeOptions;
