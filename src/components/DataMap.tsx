import { dataMapStyles } from "@styles";
import { TopoJSONNames } from "@types";
import { useRef } from "react";
import {
  ReactSVGPanZoom,
  UncontrolledReactSVGPanZoom,
} from "react-svg-pan-zoom";
import ProvincePath from "./provinces/ProvincePath";

export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const DataMap = () => {
  const Viewer = useRef<ReactSVGPanZoom>(null);

  return (
    <div className={dataMapStyles.datamap}>
      <UncontrolledReactSVGPanZoom
        miniatureProps={{
          background: "#0000",
          width: 0,
          height: 0,
          position: "none",
        }}
        SVGBackground="#0000"
        ref={Viewer}
        detectAutoPan={false}
        width={1000}
        height={1000}
      >
        <svg width={1000} height={1000}>
          <ProvincePath provinceName={TopoJSONNames.BC} />
          <ProvincePath provinceName={TopoJSONNames.AB} />
          <ProvincePath provinceName={TopoJSONNames.SK} />
          <ProvincePath provinceName={TopoJSONNames.MB} />
          <ProvincePath provinceName={TopoJSONNames.ON} />
          <ProvincePath provinceName={TopoJSONNames.QC} />
          <ProvincePath provinceName={TopoJSONNames.NB} />
          <ProvincePath provinceName={TopoJSONNames.NL} />
          <ProvincePath provinceName={TopoJSONNames.NS} />
          <ProvincePath provinceName={TopoJSONNames.PE} />
          <ProvincePath provinceName={TopoJSONNames.YT} />
          <ProvincePath provinceName={TopoJSONNames.NT} />
          <ProvincePath provinceName={TopoJSONNames.NU} />
        </svg>
      </UncontrolledReactSVGPanZoom>
    </div>
  );
};

export default DataMap;
