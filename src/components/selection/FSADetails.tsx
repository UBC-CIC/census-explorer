import useFSASets from "@hooks/province/useFSASets";
import { FSAType } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";

type FSADetailsProps = {
  fsa: FSAType;
};

const FSADetails = ({ fsa }: FSADetailsProps) => {
  const fsaSets = useFSASets();
  const province = getProvinceFromFSA(fsa, fsaSets);
  return (
    <ul>
      <li>Province: {province.toUpperCase()}</li>
      <li>Dwellings: 5000</li>
      <li>Households: 4900</li>
    </ul>
  );
};

export default FSADetails;
