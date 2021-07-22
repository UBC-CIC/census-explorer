import SelectedProvincesContext from "@context/SelectedProvincesContext";
import { memo, useContext } from "react";

type ProvinceSelectProps = {};

const ProvinceSelect = memo((props: ProvinceSelectProps) => {
  const { setProvinces } = useContext(SelectedProvincesContext);
  return (
    <div>
      <button
        onClick={() =>
          setProvinces(({ bc, qc, yt }) => ({ bc: !bc, qc: !qc, yt: !yt }))
        }
      >
        Click
      </button>
    </div>
  );
});

export default ProvinceSelect;
