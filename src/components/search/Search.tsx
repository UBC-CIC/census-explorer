import { searchStyles } from "@styles";
import { useState } from "react";
type SelectionProps = {};

const Search = (props: SelectionProps) => {
  const [visible, setVisible] = useState(false);

  return <div className={searchStyles.root}>Search</div>;
};

export default Search;
