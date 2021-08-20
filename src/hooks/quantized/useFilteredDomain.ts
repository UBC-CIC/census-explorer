import CurrentScaleContext from "@context/appstate/CurrentScaleProvider";
import { useContext } from "react";
const useFilteredDomain = () => {
  const currentScale = useContext(CurrentScaleContext);
  if (!currentScale)
    throw new Error(
      "useCurrentScale must be called inside a CurrentScaleContext"
    );
  return {
    max: currentScale.max,
    min: currentScale.min,
    domain: currentScale.domain,
    dev: currentScale.dev,
  };
};

export default useFilteredDomain;
