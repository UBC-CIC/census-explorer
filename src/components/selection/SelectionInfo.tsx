import { Button, Collapse } from "@material-ui/core";
import { selectionStyles } from "@styles";
import { FSAType } from "@types";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

type SelectionInfoProps = {
  fsa: FSAType;
};

const SelectionInfo = ({ fsa }: SelectionInfoProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={selectionStyles.fsaButtonContainer}>
        <IconButton className={selectionStyles.iconButton}>
          <Clear />
        </IconButton>
        <Button
          className={selectionStyles.fsaButton}
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(!open)}
        >
          {fsa}
        </Button>
      </div>
      <Collapse in={open}>More Info</Collapse>
    </>
  );
};

export default SelectionInfo;
