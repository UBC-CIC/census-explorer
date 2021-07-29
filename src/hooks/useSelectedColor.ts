import { FSA } from "@types";
import { randomColor } from "@utils/randomColor";
import useQuantizedData from "./useQuantizedData";

const useSelectedColor = (FSA: FSA) => {
  const quantize = useQuantizedData();
  console.log(quantize);

  return quantize[FSA] || "#c4c4c4";
};

export default useSelectedColor;
