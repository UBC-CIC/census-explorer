import FSASelectionContext from "@context/appstate/FSASelectionProvider";
import IsolatedFSAContext from "@context/appstate/IsolatedFSAProvider";
import strings from "@l10n/strings";
import { Button, Collapse, IconButton, makeStyles } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { selectionStyles } from "@styles";
import L from "leaflet";
import { flatten } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { CSVDownload, CSVLink } from "react-csv";
import { AsyncClickHandler } from "react-csv/components/CommonPropTypes";
import { useMap } from "react-leaflet";
import getAllFSAData from "./getSelectionData";
import SelectionInfo from "./SelectionInfo";
type SelectionProps = {};

const useStyles = makeStyles((theme) => ({
  mainButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  mainButton: {
    margin: "10px",
    fontSize: "10px",
  },
  downloadButton: {
    fontSize: "8px",
  },
  controlButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

const Selection = (props: SelectionProps) => {
  const [visible, setVisible] = useState(false);
  const styles = useStyles();
  const map = useMap();
  (map as any)?.selectArea?.enable();
  const { selection, setSelection } = useContext(FSASelectionContext);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [downloadCSV, setDownloadCSV] = useState(false);
  const { isolated, setIsolated } = useContext(IsolatedFSAContext);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const csvInstance = useRef<any | null>(null);

  useEffect(() => {
    if (overlayRef.current) {
      L.DomEvent.disableScrollPropagation(overlayRef.current);
    }
  }, [overlayRef]);

  // Workaround for downloading async data
  useEffect(() => {
    if (csvData.length > 1) {
      setTimeout(() => {
        setDownloadCSV(false);
        setCsvData([]);
      });
    }
  }, [csvData]);
  const handleClear = () => {
    setSelection(new Set());
  };
  const handleIsolate = () => {
    setIsolated(new Set(selection));
    setSelection(new Set());
  };

  const transform = (data: any[]) => {
    console.log(data);

    const transformedData = data.map((d) => {
      return flatten([flatten(d.census), flatten(d.donations)]);
    });

    console.log(transformedData);

    let retData: any[] = [];
    transformedData.forEach((d) => {
      retData.push(...d);
    });
    return retData;
  };

  const queryAndFormatToCSV = async () => {
    const promises = [] as Promise<any>[];
    selection.forEach((FSA: any) => promises.push(getAllFSAData({ FSA })));
    const data = await Promise.all(promises);
    return transform(data);
  };

  const handleDownload = async () => {
    let data = await queryAndFormatToCSV();
    setCsvData(() => data);
    setDownloadCSV(() => true);
    console.log(data);
    setDownloadCSV(() => false);
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
      <div className={styles.mainButtonContainer}>
        <div className={styles.controlButtons}>
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
            className={styles.mainButton}
          >
            Clear Selection
          </Button>
        </div>
        {!!selection.size && (
          <Button
            color="primary"
            onClick={handleDownload}
            variant="contained"
            className={styles.downloadButton}
          >
            Download Selection
          </Button>
        )}
        {downloadCSV && (
          <CSVDownload data={csvData} filename="CensusExplorerExport" />
        )}
      </div>
    </Collapse>
  );
};

export default Selection;
