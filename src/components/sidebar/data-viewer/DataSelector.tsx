import SelectedDataContext from "@context/SelectedDataProvider";
import { Button } from "@material-ui/core";
import { SelectedDataOption } from "@types";
import { useContext } from "react";

const DataSelector = () => {
  const { selected, setSelected } = useContext(SelectedDataContext);
  const handleSelectOption = (option: SelectedDataOption) => {
    setSelected(option);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant={
          selected === SelectedDataOption.FAMILY ? "contained" : "outlined"
        }
        color="primary"
        onClick={() => handleSelectOption(SelectedDataOption.FAMILY)}
      >
        Family Data
      </Button>
      <Button
        variant={
          selected === SelectedDataOption.CENSUS ? "contained" : "outlined"
        }
        color="primary"
        onClick={() => handleSelectOption(SelectedDataOption.CENSUS)}
      >
        Census Data
      </Button>
      <Button
        variant={
          selected === SelectedDataOption.INCOME ? "contained" : "outlined"
        }
        color="primary"
        onClick={() => handleSelectOption(SelectedDataOption.INCOME)}
      >
        Income Data
      </Button>
    </div>
  );
};

export default DataSelector;
