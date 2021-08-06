import ColorLegend from "@components/colorLegend/ColorLegend";
import { sidebarStyles } from "@styles";
import DataSelector from "./data-viewer/DataSelector";
import ProvinceSelectMap from "./selector/ProvinceSelectMap";

type SidebarProps = {};

const Sidebar = (props: SidebarProps) => {
  return (
    <div className={sidebarStyles.sidebar}>
      <ProvinceSelectMap />
      <DataSelector />
    </div>
  );
};

export default Sidebar;
