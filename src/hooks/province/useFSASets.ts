import ProvinceDataContext from "@context/ProvinceDataProvider";
import { useContext } from "react";

const useFSASets = () => {
  const context = useContext(ProvinceDataContext);
  if (!context)
    throw new Error("useFSASets must be called inside a ProvinceDataContext");
  return context.fsaSets;
};

export default useFSASets;
