import { SelectorShown } from "@types";
import React from "react";
import CheckboxSelector from "./CheckboxSelector";
import ProvinceSelectMap from "./ProvinceSelectMap";

type SelectorSelectorProps = {
  shown: SelectorShown;
  setShown: React.Dispatch<React.SetStateAction<SelectorShown>>;
};

const SelectorSelector = ({ shown, setShown }: SelectorSelectorProps) => {
  const Map = React.memo(() => (
    <ProvinceSelectMap shown={shown} setShown={setShown} />
  ));
  const Checkbox = <CheckboxSelector shown={shown} setShown={setShown} />;
  if (shown === SelectorShown.CHECKBOX) return Checkbox;
  else return <Map />;
};

export default SelectorSelector;
