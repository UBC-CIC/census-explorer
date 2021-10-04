import useFSASets from "@hooks/province/useFSASets";
import { Button } from "@material-ui/core";
import { FSAType } from "@types";
import getProvinceFromFSA from "@utils/getProvinceFromFSA";

type FSADetailsProps = {
  fsa: FSAType;
};

const FSADetails = ({ fsa }: FSADetailsProps) => {
  const fsaSets = useFSASets();
  const province = getProvinceFromFSA(fsa, fsaSets);

  const performSimilarSearch = () => {
    ///
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
      <Button color="primary" variant="outlined">
        Find Similar
      </Button>
    </div>
  );
};

export default FSADetails;
