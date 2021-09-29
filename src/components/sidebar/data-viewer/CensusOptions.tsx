import SelectedIncomeTypeContext from "@context/appstate/SelectedIncomeTypeProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { ButtonGroup, Collapse, makeStyles } from "@material-ui/core";
import { selectorStyles } from "@styles";
import { SelectedCategoryOption } from "@types";
import { useContext } from "react";
import CensusCategories from "./CensusCategories";

type FamilyOptionsProps = {};

const useStyles = makeStyles((theme) => ({
  // incomeOption: {
  //   fontSize: 10,
  // },
  // incomeOptionsGroup: {
  //   border: `1px solid ${theme.palette.secondary.main}`,
  //   marginBottom: theme.spacing(1),
  //   marginTop: theme.spacing(1),
  // },
}));

const CensusOptions = () => {
  const classes = useStyles();
  const { selectedIncomeType, setSelectedIncomeType } = useContext(
    SelectedIncomeTypeContext
  );
  const loading = useCensusDataLoading();
  const selectedCategory = useSelectedCategory();
  const headers = useCensusHeaders();
  console.log(headers);

  const active = !loading && selectedCategory === SelectedCategoryOption.CENSUS;
  console.log(active);
  return (
    <Collapse in={active}>
      <div className={selectorStyles.censusOptions}>
        <CensusCategories />
      </div>
    </Collapse>
  );
};

export default CensusOptions;
