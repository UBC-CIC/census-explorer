import SelectedCategoryContext from "@context/appstate/SelectedCategoryProvider";
import { useContext } from "react";

const useSelectedCategory = () => {
  const context = useContext(SelectedCategoryContext);

  if (!context)
    throw new Error(
      "useSelectedCategory must be called inside a SelectedCategoryContext"
    );
  return context.selected;
};

export default useSelectedCategory;
