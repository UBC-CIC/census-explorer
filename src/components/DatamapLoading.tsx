import useWindowDimensions from "@hooks/useWindowDimensions";
import { dataMapStyles } from "@styles";
import "@styles/resizable.module.css";
import { ResizableBox } from "react-resizable";
import Spinner from "./Spinner";

type DatamapLoadingProps = {};

const DatamapLoading = (props: DatamapLoadingProps) => {
  const window = useWindowDimensions();
  return (
    <ResizableBox
      width={500}
      height={500}
      maxConstraints={[1000, window.height]}
      draggableOpts={{}}
      handle={<i className={`fas fa-compress-alt ${dataMapStyles.icon}`}></i>}
    >
      <div className={dataMapStyles.loading}>
        <Spinner />
      </div>
    </ResizableBox>
  );
};

export default DatamapLoading;
