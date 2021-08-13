import CurrentScaleContext from "@context/appstate/CurrentScaleProvider";
import { useContext } from "react";
const useCurrentColorScale = () => {
  const currentScale = useContext(CurrentScaleContext);
  if (!currentScale)
    throw new Error(
      "useCurrentScale must be called inside a CurrentScaleContext"
    );
  return currentScale.colorScale;
};

export default useCurrentColorScale;
