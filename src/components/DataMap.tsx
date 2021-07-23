import useWindowDimensions from "@hooks/useWindowDimensions";
import { dataMapStyles } from "@styles";
import "@styles/resizable.module.css";
import { TopoJSONNames } from "@types";
import { useRef, useState } from "react";
import { ResizableBox } from "react-resizable";
import {
  ReactSVGPanZoom,
  UncontrolledReactSVGPanZoom,
} from "react-svg-pan-zoom";
import MinimapProvincePath from "./provinces/MinimapProvincePath";
import ProvincePath from "./provinces/ProvincePath";
import Miniature from "./ui-miniature/miniature";

const DataMap = () => {
  const Viewer = useRef<ReactSVGPanZoom>(null);
  const window = useWindowDimensions();
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  return (
    <div className={dataMapStyles.datamap} style={{ width, height }}>
      <ResizableBox
        width={width}
        height={height}
        onResize={(_, data) => {
          setWidth(data.size.width);
          setHeight(data.size.height);
        }}
        maxConstraints={[1000, window.height]}
        draggableOpts={{}}
        handle={<i className={`fas fa-compress-alt ${dataMapStyles.icon}`}></i>}
      >
        <UncontrolledReactSVGPanZoom
          miniatureProps={{
            background: "#393A3B",
            width: 100,
            height: 100,
            position: "left",
          }}
          className="mapperbox"
          customMiniature={(props: any) => {
            return (
              <Miniature SVGWidth={500} SVGHeight={500} {...props}>
                <MinimapProvincePath provinceName={TopoJSONNames.bc} />
                <MinimapProvincePath provinceName={TopoJSONNames.ab} />
                <MinimapProvincePath provinceName={TopoJSONNames.sk} />
                <MinimapProvincePath provinceName={TopoJSONNames.mb} />
                <MinimapProvincePath provinceName={TopoJSONNames.on} />
                <MinimapProvincePath provinceName={TopoJSONNames.qc} />
                <MinimapProvincePath provinceName={TopoJSONNames.nb} />
                <MinimapProvincePath provinceName={TopoJSONNames.nl} />
                <MinimapProvincePath provinceName={TopoJSONNames.ns} />
                <MinimapProvincePath provinceName={TopoJSONNames.pe} />
                <MinimapProvincePath provinceName={TopoJSONNames.yt} />
                <MinimapProvincePath provinceName={TopoJSONNames.nt} />
                <MinimapProvincePath provinceName={TopoJSONNames.nu} />
              </Miniature>
            );
          }}
          SVGBackground="#0000"
          ref={Viewer}
          detectAutoPan={false}
          width={width}
          height={height}
        >
          <svg>
            <ProvincePath provinceName={TopoJSONNames.bc} />
            <ProvincePath provinceName={TopoJSONNames.ab} />
            <ProvincePath provinceName={TopoJSONNames.sk} />
            <ProvincePath provinceName={TopoJSONNames.mb} />
            <ProvincePath provinceName={TopoJSONNames.on} />
            <ProvincePath provinceName={TopoJSONNames.qc} />
            <ProvincePath provinceName={TopoJSONNames.nb} />
            <ProvincePath provinceName={TopoJSONNames.nl} />
            <ProvincePath provinceName={TopoJSONNames.ns} />
            <ProvincePath provinceName={TopoJSONNames.pe} />
            <ProvincePath provinceName={TopoJSONNames.yt} />
            <ProvincePath provinceName={TopoJSONNames.nt} />
            <ProvincePath provinceName={TopoJSONNames.nu} />
          </svg>
        </UncontrolledReactSVGPanZoom>
      </ResizableBox>
    </div>
  );
};

export default DataMap;
