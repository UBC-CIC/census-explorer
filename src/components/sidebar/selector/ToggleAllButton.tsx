import {
  DEFAULT_FALSE_PROVINCES,
  DEFAULT_TRUE_PROVINCES,
} from "@constants/SelectorConstants";
import SelectedProvincesContext from "@context/appstate/SelectedProvincesContext";
import strings from "@l10n/strings";
import { Button, makeStyles } from "@material-ui/core";
import { useContext } from "react";
type ToggleAllButtonProps = { flat?: boolean };

const useStyles = makeStyles({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
const ToggleAllButton = ({ flat }: ToggleAllButtonProps) => {
  const classes = useStyles();
  const { provinces, setProvinces } = useContext(SelectedProvincesContext);
  const provinceValues = Object.values(provinces);
  const allProvincesShown = provinceValues.every((value) => value === true);
  const toggleAllProvinces = (value: boolean) => {
    setProvinces(!value ? DEFAULT_TRUE_PROVINCES : DEFAULT_FALSE_PROVINCES);
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleAllProvinces(allProvincesShown)}
        className={flat ? classes.button : ""}
      >
        {allProvincesShown ? strings.hide : strings.show} {strings.allProvinces}
      </Button>
    </div>
  );
};

export default ToggleAllButton;
