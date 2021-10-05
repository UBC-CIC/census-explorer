import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import IsolatedFSAContext from "@context/appstate/IsolatedFSAProvider";
import SelectedNumericalContext from "@context/appstate/SelectedNumericalProvider";
import CensusDataContext from "@context/census/CensusDataProvider";
import useSelectedCategory from "@hooks/appstate/useSelectedCategory";
import useSelectedType from "@hooks/appstate/useSelectedType";
import useFSASets from "@hooks/province/useFSASets";
import { Button } from "@material-ui/core";
import { FSAType, SelectedCategoryOption } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";
import { useContext } from "react";
import callSimilarLambda from "./callSimilarLambda";

type FSADetailsProps = {
  fsa: FSAType;
};

const FSADetails = ({ fsa }: FSADetailsProps) => {
  const fsaSets = useFSASets();
  const province = getProvinceFromFSA(fsa, fsaSets);
  const type = useSelectedType();
  const category = useSelectedCategory();
  const { setSelection } = useContext(FSASelectionContext);
  const { setIsolated } = useContext(IsolatedFSAContext);
  const performSimilarSearch = async () => {
    const input = { FSAs: [fsa], type, category };
    let result = await callSimilarLambda({
      FSAs: [fsa],
      [category === SelectedCategoryOption.CENSUS ? "CID" : "TYPE"]: type,
    });
    if (!result) return;
    const similar: FSAType[] = [
      ...result.donation,
      ...result.census,
      fsa,
    ] as FSAType[];
    console.log(similar);
    setSelection(new Set(similar));
    setIsolated(new Set(similar));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: ".25rem 0",
      }}
    >
      <p>
        Province: <strong>{province.toUpperCase()}</strong>
      </p>
      <Button onClick={performSimilarSearch} color="primary" variant="outlined">
        Find Similar
      </Button>
    </div>
  );
};

export default FSADetails;
