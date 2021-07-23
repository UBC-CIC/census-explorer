import { ProvinceOptions } from "@context/SelectedProvincesContext";
import { Switch } from "@material-ui/core";
import { selectOptionsStyles } from "@styles";
import { LongProvinceNames, TopoJSONNames } from "@types";

type SelectOptionProps = {
  province: keyof ProvinceOptions;
  value: boolean;
  onClick: () => void;
};

const SelectOption = ({ province, value, onClick }: SelectOptionProps) => {
  return (
    <div className={selectOptionsStyles.optionContainer}>
      <Switch onClick={() => onClick()} checked={value} name={province} />
      <div>{LongProvinceNames[province]}</div>
    </div>
  );
};

export default SelectOption;
