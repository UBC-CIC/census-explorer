import {
  DEFAULT_FALSE_PROVINCES,
  DEFAULT_TRUE_PROVINCES,
  MAP_SIZE,
} from "@constants/SelectorConstants";
import SelectedProvincesContext from "@context/appstate/SelectedProvincesContext";
import strings from "@l10n/strings";
import { Button, makeStyles } from "@material-ui/core";
import { selectorStyles } from "@styles";
import { SelectorShown } from "@types";
import { useContext } from "react";
import { AllSelectorProvinces } from "./AllSelectorProvinces";
import ChangeSelectorButton from "./ChangeSelectorButton";
import ToggleAllButton from "./ToggleAllButton";

type ProvinceSelectMapProps = {
  shown: SelectorShown;
  setShown: React.Dispatch<React.SetStateAction<SelectorShown>>;
};
const useStyles = makeStyles({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
const ProvinceSelectMap = ({ setShown, shown }: ProvinceSelectMapProps) => {
  const classes = useStyles();
  const toggleView = () => {
    setShown(SelectorShown.CHECKBOX);
  };

  return (
    <div className={selectorStyles.root}>
      <div
        className={selectorStyles.selectorContainer}
        style={{ width: MAP_SIZE, height: MAP_SIZE }}
      >
        <svg
          viewBox={`${MAP_SIZE / 5} ${MAP_SIZE / 6} ${MAP_SIZE} ${MAP_SIZE}`}
        >
          <g style={{ transform: "scale(1.4)" }}>
            <AllSelectorProvinces
              fill={"#fff"}
              strokeWidth={0.4}
              width={MAP_SIZE}
              height={MAP_SIZE}
            />
          </g>
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ToggleAllButton flat />
        <ChangeSelectorButton shown={shown} toggleShown={toggleView} />
      </div>
    </div>
  );
};

export default ProvinceSelectMap;
