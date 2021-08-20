import OpacityContext from "@context/appstate/OpacityProvider";
import strings from "@l10n/strings";
import { Collapse, IconButton, Slider, Typography } from "@material-ui/core";
import { opacitySliderStyles } from "@styles";
import { useContext, useState } from "react";
import _ from "lodash";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
type OpacitySliderProps = {};

const OpacitySlider = (props: OpacitySliderProps) => {
  const [visible, setVisible] = useState(false);
  const { opacity, setOpacity } = useContext(OpacityContext);
  const handleOpacityChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setOpacity(newValue);
    }
  };
  return (
    <Collapse
      className={opacitySliderStyles.container}
      in={visible}
      collapsedSize={20}
    >
      <div className={opacitySliderStyles.topContainer}>
        <div id="input-slider">{strings.opacity}</div>
        <IconButton
          className={opacitySliderStyles.button}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      <Slider
        value={opacity}
        step={0.01}
        min={0}
        max={1}
        onChange={_.throttle(handleOpacityChange, 100)}
      />
    </Collapse>
  );
};

export default OpacitySlider;
