import { FSAType } from "@types";

type SelectionInfoProps = {
  fsa: FSAType;
};

const SelectionInfo = ({ fsa }: SelectionInfoProps) => {
  return <div>{fsa}</div>;
};

export default SelectionInfo;
