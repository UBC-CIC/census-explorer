import { Button, Collapse } from "@material-ui/core";
import { selectionStyles } from "@styles";
import { FSAType } from "@types";
import { useContext, useState } from "react";
import { IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import FSADetails from "./FSADetails";
import HoveredContext from "@context/appstate/HoveredProvider";

type SelectionInfoProps = {
  fsa: FSAType;
};

const SelectionInfo = ({ fsa }: SelectionInfoProps) => {
  const [open, setOpen] = useState(false);
  const { setSelection } = useContext(FSASelectionContext);
  const handleClear = (fsa: FSAType) => {
    setSelection((old) => {
      let newSet = new Set(old);
      newSet.delete(fsa);
      return newSet;
    });
  };

  const { setHovered } = useContext(HoveredContext);

  const handleHover = () => {
    setHovered(fsa);
  };

  const handleLeave = () => {
    setHovered(undefined);
  };

  return (
    <div>
      <div className={selectionStyles.fsaButtonContainer}>
        <IconButton
          onClick={() => handleClear(fsa)}
          className={selectionStyles.iconButton}
          color="primary"
        >
          <Clear />
        </IconButton>
        <Button
          onMouseOver={handleHover}
          onMouseLeave={handleLeave}
          className={selectionStyles.fsaButton}
          variant={open ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setOpen(!open)}
        >
          {fsa}
        </Button>
      </div>
      <Collapse in={open}>
        <FSADetails />
      </Collapse>
    </div>
  );
};

export default SelectionInfo;
