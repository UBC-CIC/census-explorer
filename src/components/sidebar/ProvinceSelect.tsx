import SelectedProvincesContext, {
  ProvinceOptions,
} from "@context/SelectedProvincesContext";
import { Switch } from "@material-ui/core";
import { selectOptionsStyles } from "@styles";
import { memo, useContext } from "react";
import SelectOption from "./SelectOption";

type ProvinceSelectProps = {};

const DEFAULT_FALSE_PROVINCES: ProvinceOptions = {
  bc: false,
  sk: false,
  nb: false,
  qc: false,
  yt: false,
  nl: false,
  ns: false,
  nt: false,
  nu: false,
  on: false,
  ab: false,
  mb: false,
  pe: false,
};

const DEFAULT_TRUE_PROVINCES: ProvinceOptions = {
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

const ProvinceSelect = memo((props: ProvinceSelectProps) => {
  const { provinces, setProvinces } = useContext(SelectedProvincesContext);
  const onClickProvince = (province: keyof ProvinceOptions) => {
    setProvinces((old) => ({ [province]: !old[province] }));
  };
  const provinceIterable = Object.entries(provinces);
  const provinceValues = Object.values(provinces);
  const provinceKeys = Object.keys(
    provinces
  ) as unknown as keyof ProvinceOptions[];

  const toggleAllProvinces = (value: boolean) => {
    setProvinces(!value ? DEFAULT_TRUE_PROVINCES : DEFAULT_FALSE_PROVINCES);
  };

  return (
    <div className={selectOptionsStyles.provinceSelectorContainer}>
      {provinceIterable.map((arr: unknown) => {
        const typedArr = arr as [keyof ProvinceOptions, boolean];
        const [key, value] = typedArr;
        return (
          <SelectOption
            province={key}
            value={value}
            onClick={() => onClickProvince(key)}
          />
        );
      })}
      <Switch
        checked={provinceValues.every((value) => value === true)}
        onClick={(e) =>
          toggleAllProvinces(provinceValues.every((value) => value === true))
        }
      />
      Toggle All Provinces
    </div>
  );
});

export default ProvinceSelect;
