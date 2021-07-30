import { ProvinceOptions, TopoJSONNames } from "@types";
import React, { ReactNode, useState } from "react";

type NewProvinceOptions = { [province in TopoJSONNames]?: boolean };

type SetProvincesInput =
  | NewProvinceOptions
  | ((oldProvinces: ProvinceOptions) => NewProvinceOptions);

type SelectedProvincesType = {
  setProvinces: (newProvinces: SetProvincesInput) => void;
  provinces: ProvinceOptions;
};

const DEFAULT_PROVINCE_VALUE = true;

const defaultProvinces: ProvinceOptions = {
  bc: DEFAULT_PROVINCE_VALUE,
  sk: DEFAULT_PROVINCE_VALUE,
  nb: DEFAULT_PROVINCE_VALUE,
  qc: DEFAULT_PROVINCE_VALUE,
  yt: DEFAULT_PROVINCE_VALUE,
  nl: DEFAULT_PROVINCE_VALUE,
  ns: DEFAULT_PROVINCE_VALUE,
  nt: DEFAULT_PROVINCE_VALUE,
  nu: DEFAULT_PROVINCE_VALUE,
  on: DEFAULT_PROVINCE_VALUE,
  ab: DEFAULT_PROVINCE_VALUE,
  mb: DEFAULT_PROVINCE_VALUE,
  pe: DEFAULT_PROVINCE_VALUE,
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
