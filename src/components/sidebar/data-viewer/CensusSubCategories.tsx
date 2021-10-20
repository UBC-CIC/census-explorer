import CensusDataContext from "@context/census/CensusDataProvider";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { makeStyles, MenuItem, Select } from "@material-ui/core";
import { useContext, useEffect } from "react";

type CensusSubCategoriesProps = {
  selectedHeader: string;
};

const useStyles = makeStyles((theme) => ({
  selector: {
    width: "100%",
    flex: 1,
  },
}));
const CensusSubCategories = ({ selectedHeader }: CensusSubCategoriesProps) => {
  const classes = useStyles();
  const headers = useCensusHeaders();
  const selected = headers.get(selectedHeader);
  // const [, setSelectedCID] = useState<number>(0);
  const { handleChangeSubcategory: changeUpperSubcategory, selectedCID } =
    useContext(CensusDataContext);

  useEffect(() => {
    const newSelected = headers.get(selectedHeader);
    if (newSelected) {
      // This is excluded from dependency list because otherwise this causes the subcategory to be reset
      changeUpperSubcategory(newSelected[0].CID);
    }
  }, [headers, selectedHeader]);

  return (
    <div style={{ width: "100%" }}>
      <Select
        variant="outlined"
        color="secondary"
        onChange={(e) => changeUpperSubcategory(e.target.value as number)}
        value={selectedCID}
        className={classes.selector}
      >
        {selected?.map((option) => (
          <MenuItem value={option.CID}>{option.category}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CensusSubCategories;
