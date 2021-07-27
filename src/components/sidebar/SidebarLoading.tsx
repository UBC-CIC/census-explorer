import Spinner from "@components/Spinner";
import { MAP_SIZE } from "@constants/SelectorConstants";
import { sidebarStyles } from "@styles";

type SidebarLoadingProps = {};

const SidebarLoading = (props: SidebarLoadingProps) => {
  return (
    <div className={sidebarStyles.loading}>
      <div
        className={sidebarStyles.loadingChild}
        style={{ width: MAP_SIZE, height: MAP_SIZE }}
      >
        <Spinner />
      </div>
    </div>
  );
};

export default SidebarLoading;
