import OpacityContext from "@context/appstate/OpacityProvider";
import strings from "@l10n/strings";
import {
  Button,
  Collapse,
  IconButton,
  Slider,
  Typography,
} from "@material-ui/core";
import { opacitySliderStyles, selectionStyles } from "@styles";
import { useContext, useEffect, useRef, useState } from "react";
import _, { over } from "lodash";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import L from "leaflet";
import IsolatedFSAContext from "@context/appstate/IsolatedFSAProvider";
import SelectionInfo from "./SelectionInfo";
import { useMap } from "react-leaflet";
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
      <Button
        color="primary"
        onClick={handleIsolate}
        // disabled={selection.size === 1}
        variant="contained"
      >
        {selection.size > 0 ? strings.isolate : strings.reset}{" "}
        {strings.selection}
      </Button>
    </Collapse>
  );
};

export default Selection;
