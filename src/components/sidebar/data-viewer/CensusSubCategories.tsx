import CensusDataContext from "@context/census/CensusDataProvider";
import getCensusData from "@context/census/queries/censusDataByProvinceCID";
import useSelectedProvinces from "@hooks/appstate/useSelectedProvinces";
import useCensusHeaders from "@hooks/census/useCensusHeaders";
import { MenuItem, Select } from "@material-ui/core";
import { CacheInput, CIDandCategory } from "@types";
import { CensusProvinceOption } from "API";
import { Map } from "leaflet";
import { useContext, useEffect, useState } from "react";
import ProvinceSelectMap from "../selector/ProvinceSelectMap";

type CensusSubCategoriesProps = {
  selectedHeader: string;
};

const CensusSubCategories = ({ selectedHeader }: CensusSubCategoriesProps) => {
  const headers = useCensusHeaders();
  const selected = headers.get(selectedHeader);
  const [selectedCID, setSelectedCID] = useState<number>(0);
  const { cacheCensusData } = useContext(CensusDataContext);
  const provinces = useSelectedProvinces();
  const getSelectedData = () => {
    console.log(provinces);
  };
  useEffect(() => {
    if (selected) {
      setSelectedCID(selected[0].CID);
    }
  }, [selected, selectedHeader]);

  const handleChangeSubcategory = async (selection: number) => {
    setSelectedCID(selection);
    // setGlobalCID(selection);
    const selectedProvinces = Object.entries(provinces)
      .filter(([key, value]) => value)
      .map(([key]) => key.toUpperCase() as CensusProvinceOption);

    let a = await Promise.all(
      selectedProvinces.map(async (province) => {
        return { [province]: await getCensusData(province, selection) };
      })
    );
    console.log(a);
    cacheCensusData(a as CacheInput);
  };

  if (!selected) return <div />;

  return (
    <div>
      <Select
        onChange={(e) => handleChangeSubcategory(e.target.value as number)}
        value={selectedCID}
      >
        {selected.map((option) => (
          <MenuItem value={option.CID}>{option.category}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CensusSubCategories;
