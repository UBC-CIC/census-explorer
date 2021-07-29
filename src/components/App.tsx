import DataMap from "./DataMap";
import { appStyles } from "@styles";
import { SelectedProvincesProvider } from "@context/SelectedProvincesContext";
import Sidebar from "./sidebar/Sidebar";
import { ProvinceDataProvider } from "@context/ProvinceDataProvider";
import useProvincesLoading from "@hooks/useProvincesLoading";
import SidebarLoading from "./sidebar/SidebarLoading";
import DatamapLoading from "./DatamapLoading";
import { FamilyDataProvider } from "@context/FamilyDataProvider";
import useFamilyDataLoading from "@hooks/useFamilyDataLoading";
import { SelectedDataProvider } from "@context/SelectedDataProvider";
import ColorLegend from "./colorLegend/ColorLegend";
import { QuantizedDataProvider } from "@context/QuantizedDataProvider";
function App() {
  return (
    <div className={appStyles.App}>
      <SelectedProvincesProvider>
        <ProvinceDataProvider>
          <FamilyDataProvider>
            <SelectedDataProvider>
              <AppCore />
            </SelectedDataProvider>
          </FamilyDataProvider>
        </ProvinceDataProvider>
      </SelectedProvincesProvider>
    </div>
  );
}

const AppCore = () => {
  const provincesLoading = useProvincesLoading();
  const familyLoading = useFamilyDataLoading();
  const loading = provincesLoading || familyLoading;
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
      <QuantizedDataProvider>
        <DataMap />
        <Sidebar />
      </QuantizedDataProvider>
    </>
  );
};

export default App;
