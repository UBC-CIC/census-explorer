import { SelectedCategoryOption } from "@types";
import React, { ReactNode, useState } from "react";

type SelectedCategoryContextType = {
  selected: SelectedCategoryOption;
  setSelected: React.Dispatch<React.SetStateAction<SelectedCategoryOption>>;
};

const SelectedCategoryContext = React.createContext(
  {} as SelectedCategoryContextType
);

export const SelectedCategoryProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [selected, setSelected] = useState(SelectedCategoryOption.FAMILY);

  return (
    <SelectedCategoryContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
};

export default SelectedCategoryContext;
