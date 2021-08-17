import HoveredContext from "@context/appstate/HoveredProvider";
import { FSAType } from "@types";
import { useContext } from "react";

const useIsHovered = (fsa: FSAType) => {
  const context = useContext(HoveredContext);

  if (!context)
    throw new Error(
      "useSelectedCategory must be called inside a SelectedCategoryContext"
    );

  const { hovered } = context;

  return hovered === fsa;
};

export default useIsHovered;
