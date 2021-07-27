import { sidebarStyles } from "@styles";
import ProvinceSelectMap from "./selector/ProvinceSelectMap";

type SidebarProps = {};

const Sidebar = (props: SidebarProps) => {
  return (
    <div className={sidebarStyles.sidebar}>
      <ProvinceSelectMap />
    </div>
  );
};

export default Sidebar;
