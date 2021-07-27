import DataMap from "./DataMap";
import { appStyles } from "@styles";
import { SelectedProvincesProvider } from "@context/SelectedProvincesContext";
import Sidebar from "./sidebar/Sidebar";
import { ProvinceDataProvider } from "@context/ProvinceDataProvider";
import useProvincesLoading from "@hooks/useProvincesLoading";
import SidebarLoading from "./sidebar/SidebarLoading";
import DatamapLoading from "./DatamapLoading";
function App() {
  return (
    <div className={appStyles.App}>
      <SelectedProvincesProvider>
        <ProvinceDataProvider>
          <AppCore />
        </ProvinceDataProvider>
      </SelectedProvincesProvider>
    </div>
  );
}

const AppCore = () => {
  const loading = useProvincesLoading();
  if (loading) {
    return (
      <>
        <DatamapLoading />
        <SidebarLoading />
      </>
    );
  }
  return (
    <>
      <DataMap />
      <Sidebar />
    </>
  );
};

export default App;
