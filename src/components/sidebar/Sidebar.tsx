import { sidebarStyles } from "@styles";
import ProvinceSelect from "./ProvinceSelect";

type SidebarProps = {};

const Sidebar = (props: SidebarProps) => {
  return (
    <div className={sidebarStyles.sidebar}>
      <ProvinceSelect />
    </div>
  );
};

export default Sidebar;
