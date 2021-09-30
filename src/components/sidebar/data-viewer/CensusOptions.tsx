import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import { Collapse } from "@material-ui/core";
import { selectorStyles } from "@styles";
import { SelectedCategoryOption } from "@types";
import CensusCategories from "./CensusCategories";

const CensusOptions = () => {
  const selectedCategory = useSelectedCategory();

  const active = selectedCategory === SelectedCategoryOption.CENSUS;
  return (
    <Collapse in={active}>
      <div className={selectorStyles.censusOptions}>
        <CensusCategories />
      </div>
    </Collapse>
  );
};

export default CensusOptions;
