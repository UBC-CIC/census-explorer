import OpacityContext from "@context/appstate/OpacityProvider";
import strings from "@l10n/strings";
import { Slider, Typography } from "@material-ui/core";
import { opacitySliderStyles } from "@styles";
import { useContext, useState } from "react";
import _ from "lodash";
type OpacitySliderProps = {};

const OpacitySlider = (props: OpacitySliderProps) => {
  const { opacity, setOpacity } = useContext(OpacityContext);
  const handleOpacityChange = (event: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setOpacity(newValue);
    }
  };
  return (
    <div className={opacitySliderStyles.container} onDragCapture={() => {}}>
      <Typography id="input-slider" gutterBottom>
        {strings.opacity}
      </Typography>
      <Slider
        value={opacity}
        step={0.01}
        min={0}
        max={1}
        onChange={_.throttle(handleOpacityChange, 100)}
      />
    </div>
  );
};

export default OpacitySlider;
