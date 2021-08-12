import CurrentScaleContext from "@context/appstate/CurrentScaleProvider";
import { useContext } from "react";
const useCurrentScale = () => {
  const currentScale = useContext(CurrentScaleContext);
  if (!currentScale)
    throw new Error(
      "useCurrentScale must be called inside a CurrentScaleContext"
    );
  return currentScale.scale;
};

export default useCurrentScale;
