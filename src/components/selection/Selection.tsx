import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import IsolatedFSAContext from "@context/appstate/IsolatedFSAProvider";
import strings from "@l10n/strings";
import { Button, Collapse, IconButton } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { selectionStyles } from "@styles";
import L from "leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import SelectionInfo from "./SelectionInfo";
type SelectionProps = {};

const Selection = (props: SelectionProps) => {
  const [visible, setVisible] = useState(false);
  const map = useMap();
  (map as any)?.selectArea?.enable();
  const { selection, setSelection } = useContext(FSASelectionContext);
  console.log(selection);

  const { isolated, setIsolated } = useContext(IsolatedFSAContext);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (overlayRef.current) {
      L.DomEvent.disableScrollPropagation(overlayRef.current);
    }
  }, [overlayRef]);
  const handleClear = () => {
    setSelection(new Set());
  };
  const handleIsolate = () => {
    setIsolated(new Set(selection));
    setSelection(new Set());
  };

  return (
    <Collapse
      ref={overlayRef}
      className={selectionStyles.container}
      in={visible}
      collapsedSize={20}
    >
      <div className={selectionStyles.topContainer}>
        <div id="input-slider">{strings.selection}</div>
        <IconButton
          className={selectionStyles.button}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      <div className={selectionStyles.selectionContainer}>
        {Array.from(selection).map((fsa) => (
          <SelectionInfo fsa={fsa} key={fsa} />
        ))}
      </div>
      <div className={selectionStyles.mainButtonContainer}>
        <Button
          color="primary"
          onClick={handleIsolate}
          variant="contained"
          className={selectionStyles.mainButton}
        >
          {selection.size > 0 ? strings.isolate : strings.reset}{" "}
        </Button>
        <Button
          color="primary"
          onClick={handleClear}
          variant="contained"
          className={selectionStyles.mainButton}
        >
          Clear Selection
        </Button>
      </div>
    </Collapse>
  );
};

export default Selection;
