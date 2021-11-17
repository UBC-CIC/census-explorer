import Search from "@components/search/Search";
import { sidebarStyles } from "@styles";
import { SelectorShown } from "@types";
import { useRef, useState } from "react";
import Acknowledgement from "./Acknowledgement";
import DataSelector from "./data-viewer/DataSelector";
import InfoSection from "./InfoSection";
import Histogram from "./selector/Histogram";
import SelectorSelector from "./selector/SelectorSelector";

type SidebarProps = {};

const Sidebar = (props: SidebarProps) => {
  const [shown, setShown] = useState(SelectorShown.CHECKBOX);
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div className={sidebarStyles.sidebar} ref={sidebarRef}>
      <Histogram />
      <SelectorSelector shown={shown} setShown={setShown} />
      {/* <Search /> */}
      <InfoSection />
      <DataSelector />
      <Acknowledgement />
    </div>
  );
};

export default Sidebar;
