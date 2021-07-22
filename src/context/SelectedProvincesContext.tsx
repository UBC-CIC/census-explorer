import { TopoJSONNames } from "@types";
import React, { ReactNode, useState } from "react";

export type ProvinceOptions = { [province in TopoJSONNames]: boolean };
type NewProvinceOptions = { [province in TopoJSONNames]?: boolean };

type SetProvincesInput =
  | NewProvinceOptions
  | ((oldProvinces: ProvinceOptions) => NewProvinceOptions);

type SelectedProvincesType = {
  setProvinces: (newProvinces: SetProvincesInput) => void;
  provinces: ProvinceOptions;
};

const defaultProvinces: ProvinceOptions = {
  bc: true,
  sk: true,
  nb: true,
  qc: true,
  yt: true,
  nl: true,
  ns: true,
  nt: true,
  nu: true,
  on: true,
  ab: true,
  mb: true,
  pe: true,
};

const SelectedProvincesContext = React.createContext(
  {} as SelectedProvincesType
);

export const SelectedProvincesProvider = (props: { children?: ReactNode }) => {
  const { children } = props;
  const [provinces, _setProvinces] =
    useState<ProvinceOptions>(defaultProvinces);
  function setProvinces(newProvinces: SetProvincesInput) {
    if (typeof newProvinces === "function")
      _setProvinces((oldProvinces) => ({
        ...oldProvinces,
        ...newProvinces(oldProvinces),
      }));
    else
      _setProvinces((oldProvinces) => ({ ...oldProvinces, ...newProvinces }));
  }

  return (
    <SelectedProvincesContext.Provider value={{ provinces, setProvinces }}>
      {children}
    </SelectedProvincesContext.Provider>
  );
};

export default SelectedProvincesContext;
