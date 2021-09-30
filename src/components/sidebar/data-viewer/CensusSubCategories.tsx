import CensusDataContext from "@context/census/CensusDataProvider";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { MenuItem, Select } from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";

type CensusSubCategoriesProps = {
  selectedHeader: string;
};

const CensusSubCategories = ({ selectedHeader }: CensusSubCategoriesProps) => {
  const headers = useCensusHeaders();
  const selected = headers.get(selectedHeader);
  // const [, setSelectedCID] = useState<number>(0);
  const { handleChangeSubcategory: changeUpperSubcategory, selectedCID } =
    useContext(CensusDataContext);

  useEffect(() => {
    console.log("selectedHeader", selectedHeader);
    const newSelected = headers.get(selectedHeader);
    if (newSelected) {
      // This is excluded from dependency list because otherwise this causes the subcategory to be reset
      changeUpperSubcategory(newSelected[0].CID);
    }
  }, [headers, selectedHeader]);

  return (
    <div>
      <Select
        onChange={(e) => changeUpperSubcategory(e.target.value as number)}
        value={selectedCID}
      >
        {selected?.map((option) => (
          <MenuItem value={option.CID}>{option.category}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CensusSubCategories;
