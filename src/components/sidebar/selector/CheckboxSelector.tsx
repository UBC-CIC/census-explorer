import SelectedProvincesContext from "@context/appstate/SelectedProvincesContext";
import { LongProvinceNames } from "@l10n/strings";
import {
  makeStyles,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { selectorStyles } from "@styles";
import { SelectorShown, TopoJSONNames } from "@types";
import { useContext } from "react";
import ChangeSelectorButton from "./ChangeSelectorButton";
import ToggleAllButton from "./ToggleAllButton";

type CheckboxSelectorProps = {
  shown: SelectorShown;
  setShown: React.Dispatch<React.SetStateAction<SelectorShown>>;
};
const useStyles = makeStyles((theme) => ({
  button: {
    // borderTopLeftRadius: 0,
    // borderTopRightRadius: 0,
  },
  formLabel: {},
}));
const CheckboxSelector = ({ setShown, shown }: CheckboxSelectorProps) => {
  const classes = useStyles();
  const { provinces, setProvinces } = useContext(SelectedProvincesContext);
  const provinceEntries = Object.entries(provinces);

  const handleClick = (provinceName: TopoJSONNames) => {
    setProvinces((old) => ({ [provinceName]: !old[provinceName] }));
  };
  const toggleView = () => {
    setShown(SelectorShown.MAP);
  };
  return (
    <div className={selectorStyles.checkboxContainer}>
      <FormGroup row>
        {provinceEntries.map((entry, index) => {
          const [typedName, value] = entry as [TopoJSONNames, boolean];
          return (
            <FormControlLabel
              key={index}
              color="primary"
              className={classes.formLabel}
              onChange={() => handleClick(typedName)}
              label={LongProvinceNames[typedName]}
              control={<Checkbox color="primary" checked={value} />}
            />
          );
        })}
      </FormGroup>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ToggleAllButton />
        {/* <ChangeSelectorButton shown={shown} toggleShown={toggleView} /> */}
      </div>
    </div>
  );
};

export default CheckboxSelector;
