import {
  DEFAULT_FALSE_PROVINCES,
  DEFAULT_TRUE_PROVINCES,
  MAP_SIZE,
} from "@constants/SelectorConstants";
import SelectedProvincesContext from "@context/SelectedProvincesContext";
import strings from "@l10n/strings";
import { Button, makeStyles } from "@material-ui/core";
import { selectorStyles } from "@styles";
import { useContext } from "react";
import { AllSelectorProvinces } from "./AllSelectorProvinces";

type ProvinceSelectMapProps = {};
const useStyles = makeStyles({
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
const ProvinceSelectMap = (props: ProvinceSelectMapProps) => {
  const classes = useStyles();
  const { provinces, setProvinces } = useContext(SelectedProvincesContext);
  const provinceValues = Object.values(provinces);
  const allProvincesShown = provinceValues.every((value) => value === true);
  const toggleAllProvinces = (value: boolean) => {
    setProvinces(!value ? DEFAULT_TRUE_PROVINCES : DEFAULT_FALSE_PROVINCES);
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
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleAllProvinces(allProvincesShown)}
          className={classes.button}
        >
          {allProvincesShown ? strings.hide : strings.show}{" "}
          {strings.allProvinces}
        </Button>
      </div>
    </div>
  );
};

export default ProvinceSelectMap;
