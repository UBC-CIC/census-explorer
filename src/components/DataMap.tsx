import useWindowDimensions from "@hooks/useWindowDimensions";
import { dataMapStyles } from "@styles";
import "@styles/resizable.module.css";
import { useRef, useState } from "react";
import { ResizableBox } from "react-resizable";
import {
  ReactSVGPanZoom,
  UncontrolledReactSVGPanZoom,
} from "react-svg-pan-zoom";
import Minimap from "./minimap/Minimap";
import AllProvinces from "./provinces/AllProvinces";

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
            return <Minimap {...props} />;
          }}
          SVGBackground="#0000"
          ref={Viewer}
          detectAutoPan={false}
          width={width}
          height={height}
        >
          <svg>
            <AllProvinces />
          </svg>
        </UncontrolledReactSVGPanZoom>
      </ResizableBox>
    </div>
  );
};

export default DataMap;
