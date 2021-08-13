import CurrentScaleContext from "@context/appstate/CurrentScaleProvider";
import { useContext } from "react";
const useFilteredValue = () => {
  const currentScale = useContext(CurrentScaleContext);
  if (!currentScale)
    throw new Error(
      "useCurrentScale must be called inside a CurrentScaleContext"
    );
  return currentScale.data;
};

export default useFilteredValue;
