import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { makeStyles, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import CensusSubCategories from "./CensusSubCategories";

type CensusCategoriesProps = {};

const useStyles = makeStyles((theme) => ({
  selector: {
    width: "100%",
  },
}));
const CensusCategories = (props: CensusCategoriesProps) => {
  const headers = useCensusHeaders();
  const classes = useStyles();
  const [selectedHeader, setSelectedHeader] = useState<string>("");
  const renderHeaders = () => {
    const menuItems = [];
    for (const [key] of headers) {
      menuItems.push(<MenuItem value={key}>{key}</MenuItem>);
    }
    return menuItems;
  };

  const handleChangeCategory = (value: string) => {
    setSelectedHeader(value);
  };

  useEffect(() => {
    if (!headers.size) {
      return;
    } else {
      for (const [key] of headers) {
        // Weird way to get the first key
        setSelectedHeader(key);
        return;
      }
    }
  }, [headers]);

  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
          alignItems: "space-between",
        }}
      >
        <Select
          variant="outlined"
          color="secondary"
          onChange={(e) => handleChangeCategory(e.target.value as string)}
          value={selectedHeader}
          className={classes.selector}
        >
          {renderHeaders()}
        </Select>
      </div>
      <CensusSubCategories selectedHeader={selectedHeader} />
    </div>
  );
};

export default CensusCategories;
