import useCensusDataLoading from "@hooks/census/useCensusDataLoading";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import CensusSubCategories from "./CensusSubCategories";

type CensusCategoriesProps = {};

const CensusCategories = (props: CensusCategoriesProps) => {
  const headers = useCensusHeaders();
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
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Choose A Category:
      <Select
        variant="filled"
        onChange={(e) => handleChangeCategory(e.target.value as string)}
        value={selectedHeader}
      >
        {renderHeaders()}
      </Select>
      <CensusSubCategories selectedHeader={selectedHeader} />
    </div>
  );
};

export default CensusCategories;
